<template>
  <div>
    <div class="media">
      <div class="media-left" style="width:50px;">
        <span v-if="count" class="tag is-success">{{ count }}</span>
        <span class="icon" v-if="running || enriching">
          <i class="fa fa-spin fa-spinner"></i>
        </span>
      </div>
      <div class="media-content">
        <div v-if="error" class='notification is-danger'>{{ error }}</div>
        <strong>{{ dataset.name }}</strong>
        <small>({{ formatBytes(dataset.size) }})</small>
        <small>({{ dataset.type }})</small>
        <div class="media">
          <div class="media-content">
            <button v-if="!running" @click='start' class="button is-primary" type="button">Scan</button>
            <button v-if="count > 0" class="button is-primary" @click='startEnriching' title="Start selected enrichments">Enrich</button>
            <button v-if="running" @click='stop' class="button is-danger" type="button">Stop</button>
            <div class="is-pulled-right">
              <button v-if="count > 0" class="button is-primary" @click='saveToDisk' title="Download Output">
                <span class="icon"><i class="fa fa-download"></i></span>
              </button>
              <button class="button is-danger" @click='removeDataset' title="Delete Dataset">
                <span class="icon"><i class="fa fa-trash"></i></span>
              </button>
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
  import { PatternTypes, EnrichTypes, GlobalTypes, DatasetTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import LineReader from '@/lib/LineReader'
  import bytesToSize from '@/lib/bytesToSize'
  import FileSaver from 'file-saver'
  import Matcher from '@/lib/Matcher'
  import Enricher from '@/lib/Enricher'
  import FileScanResultTable from '@/components/FileScanResultTable'
  import FileScanResultTabs from '@/components/FileScanResultTabs'
  import FileScanResultBox from '@/components/FileScanResultBox'

  export default {
    name: 'DatasetScan',
    props: {
      dataset: {
        type: [File, Blob],
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
        enriching: false,
        error: null,
        view: 'list',
        filter: null
      }
    },
    computed: {
      ...mapGetters({
        patterns: PatternTypes.selected,
        enrichs: EnrichTypes.selected,
        fullscreen: GlobalTypes.fullscreen
      }),
      progressClass () {
        return this.error ? 'progress is-danger' : this.progress < 100 ? this.enriching ? 'progress is-info' : 'progress is-warning' : 'progress is-success'
      }
    },
    methods: {
      saveToDisk () {
        let filename = this.datset.name + '.out.json'
        let data = {
          dataset: { name: this.dataset.name, size: this.dataset.size, readableSize: bytesToSize(this.dataset.size), type: this.dataset.type },
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
        let file = this.dataset
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
      startEnriching () {
        let self = this
        let total = self.enrichs.length
        let count = 0
        self.enriching = true
        self.progress = 0
        Promise.all(self.enrichs.map(function (enrich) {
          let compatibles = self.patterns.filter(function (p) { return enrich.accepted_patterns.indexOf(p.id) >= 0 })

          return Promise.all(compatibles.map(function (pattern) {
            total += 1
            self.progress = Math.floor(count / total * 100)
            let key = [enrich.name, pattern.name].join(' - ')
            let all = self.results[pattern.name]
            return Enricher(all, enrich).then(function (resp) {
              self.results[key] = resp
              count += 1
              self.progress = Math.floor(count / total * 100)
            })
          }))
        })).then(function (resp) {
          self.progress = 100
          self.enriching = false
        })
        .catch(function (err) {
          self.error = err.toString()
          self.enriching = false
        })
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
      },
      removeDataset () {
        let a = confirm('Are you sure you want to remove ' + this.dataset.name + '?')
        if (a) {
          this.$store.dispatch(DatasetTypes.remove, this.dataset)
        }
      }
    },
    components: {
      FileScanResultTable,
      FileScanResultTabs,
      FileScanResultBox
    }
  }
</script>
