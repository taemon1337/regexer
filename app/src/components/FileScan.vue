<template>
  <div>
    <div class="media">
      <div class="media-left" style="width:50px;">
        <span v-if="count" class="tag is-success">{{ count }}</span>
        <span class="icon" v-if="running">
          <i class="fa fa-spin fa-spinner"></i>
        </span>
      </div>
      <div class="media-content">
        <div v-if="error" class='notification is-danger'>{{ error }}</div>
        <strong>{{ file.name }}</strong>
        <small>({{ formatBytes(file.size) }})</small>
        <small>({{ file.type }})</small>
        <div class="media">
          <div class="media-content">
            <button v-if="!running" @click='start' class="button is-primary" type="button">Scan</button>
            <button v-if="running" @click='stop' class="button is-danger" type="button">Stop</button>
            <div class="is-pulled-right">
              <button v-if="count > 0" class="button is-primary" @click='saveToDisk' title="Download Output">Download</button>
            </div>
          </div>
        </div>
      </div>
      <div class="media-right">
        <span class="icon" @click="showing = !showing">
          <i :class="showing ? 'fa fa-angle-up' : 'fa fa-angle-down'"></i>
        </span>
      </div>
    </div>
    <div v-if="progress" style="margin-top:5px;">
      <progress :class="progressClass" :value="progress" max="100">{{ progress }}%</progress>
    </div>
    <div v-if="showing" style="margin-top:5px;">
      <nav class="navbar is-transparent">
        <div class="navbar-item">
          <div class="field has-addons">
            <div class="control">
              <input ref='filterInput' @change="filterResults" class="input" type="text" placeholder="Filter results...">
            </div>
            <div v-if="filter" class="control">
              <button class="button" @click.prevent.stop="clearFilter">
                <span class="icon"><i class="delete"></i></span>
              </button>
            </div>
          </div>
        </div>
        <div class="navbar-end"></div>
        <div class="navbar-item">
          <div class="select">
            <select @change="setView">
              <option value='list'>List View</option>
              <option value='tabs'>Tabs View</option>
              <option value='table'>Table View</option>
            </select>
          </div>
        </div>
        <div class="navbar-item">
          <button class="button" @click='toggleFullscreen' title="">
            <span class="icon">
              <i :class="fullscreen ? 'fa fa-long-arrow-left' : 'fa fa-arrows-h'"></i>
            </span>
          </button>
        </div>
      </nav>
      <div v-if="view === 'list'">
        <div v-for="(result, name) in results" key="name">
          <file-scan-result-box :name='name' :matches='result' :filter='filter'></file-scan-result-box>
        </div>
      </div>
      <div v-else-if="view === 'tabs'">
        <file-scan-result-tabs :results='results' :filter='filter'></file-scan-result-tabs>
      </div>
      <div v-else>
        <file-scan-result-table :results='results' :filter='filter'></file-scan-result-table>
      </div>
    </div>
  </div>
</template>

<script>
  import { PatternTypes, GlobalTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import LineReader from '@/lib/LineReader'
  import bytesToSize from '@/lib/bytesToSize'
  import FileSaver from 'file-saver'
  import Matcher from '@/lib/Matcher'
  import FileScanResultTable from '@/components/FileScanResultTable'
  import FileScanResultTabs from '@/components/FileScanResultTabs'
  import FileScanResultBox from '@/components/FileScanResultBox'

  export default {
    name: 'FileScan',
    props: {
      file: {
        type: File,
        required: true
      },
      combine: {
        type: String,
        default: 'unique'
      }
    },
    data () {
      return {
        running: false,
        count: null,
        showing: false,
        results: {},
        progress: 0,
        error: null,
        view: 'list',
        filter: null
      }
    },
    computed: {
      ...mapGetters({
        patterns: PatternTypes.selected,
        fullscreen: GlobalTypes.fullscreen
      }),
      progressClass () {
        return this.error ? 'progress is-danger' : this.progress < 100 ? 'progress is-warning' : 'progress is-success'
      }
    },
    methods: {
      saveToDisk () {
        let filename = this.file.name + '.out.json'
        let data = {
          file: { name: this.file.name, size: this.file.size, readableSize: bytesToSize(this.file.size), type: this.file.type },
          filter: this.filter,
          progress: this.progress + '%',
          total: this.count,
          patterns: this.patterns,
          results: this.results
        }
        let blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        FileSaver.saveAs(blob, filename)
      },
      formatBytes (bytes) {
        return bytesToSize(bytes)
      },
      processResult (match, name, line, linenumber, pattern) {
        if (this.combine === 'discrete') {
          this.count += 1
          this.results[name].push(match)
        } else if (this.combine === 'counts') {
          if (this.results[name][match]) {
            this.results[name][match] += 1
          } else {
            this.results[name][match] = 1
          }
        } else { // default is unique
          if (this.results[name].indexOf(match) === -1) {
            this.count += 1
            this.results[name].push(match)
          }
        }
      },
      start () {
        let self = this
        self.count = 0
        self.running = true
        self.results = {}
        self.headers = []
        let file = this.file
        let reader = LineReader({ chunkSize: 10240 })
        let regexs = {}
        let patterns = {}
        let linenumber = 0
        self.patterns.forEach(function (pattern) {
          self.results[pattern.name] = []
          regexs[pattern.name] = new RegExp(pattern.regex_string, 'gmi')
          patterns[pattern.name] = pattern
        })

        reader.on('line', function (line, next, percent) {
          linenumber += 1
          self.progress = percent
          for (let name in regexs) {
            if (regexs.hasOwnProperty(name)) {
              let matches = Matcher(regexs[name], line, patterns[name])
              if (matches.length) {
                matches.forEach(function (match) {
                  self.processResult(match[0], name, line, linenumber, patterns[name])
                })
              }
            }
          }
          if (self.running) {
            next()
          }
        })

        reader.on('error', function (err) {
          self.error = err.toString()
          self.running = false
        })

        reader.on('end', function () {
          self.progress = 100
          self.running = false
        })

        reader.read(file)
      },
      stop () {
        this.running = false
      },
      viewclass (view) {
        return this.view === view ? 'button is-small is-primary' : 'button is-small'
      },
      setView (e) {
        console.log('setting view...')
        this.view = e.target.value
      },
      toggleFullscreen () {
        this.$store.dispatch(GlobalTypes.fullscreen)
      },
      filterResults (e) {
        this.filter = e.target.value
      },
      clearFilter () {
        this.filter = null
        this.$refs.filterInput.value = ''
      }
    },
    components: {
      FileScanResultTable,
      FileScanResultTabs,
      FileScanResultBox
    }
  }
</script>
