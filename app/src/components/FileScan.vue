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
      </div>
      <div class="media-right">
        <button v-if="!running" @click='start' class="button is-primary" type="button">Scan</button>
        <button v-if="running" @click='stop' class="button is-primary" type="button">Stop</button>
        <button v-if="count > 0" class="button is-primary" @click='saveToDisk' title="Download Output">
          Download
        </button>
        <span class="icon" @click="showing = !showing">
          <i :class="showing ? 'fa fa-angle-up' : 'fa fa-angle-down'"></i>
        </span>
      </div>
    </div>
    <div style="margin-top:5px;">
      <progress ref="progress" class="progress" value="0" max="100">0%</progress>
    </div>
    <div v-if="showing" style="margin-top:5px;">
      <nav class="navbar is-transparent">
        <div class="navbar-item has-dropdown">
          <a class="navbar-link">
            Docs
          </a>
      
          <div class="navbar-dropdown is-boxed">
            <a class="navbar-item">
              Overview
            </a>
            <a class="navbar-item">
              Elements
            </a>
            <a class="navbar-item">
              Components
            </a>
            <hr class="navbar-divider">
            <div class="navbar-item">
              Version 0.4.4
            </div>
          </div>
        </div>
      </nav>
      <file-scan-result-tabs :results='results'></file-scan-result-tabs>
      <file-scan-result-table :results='results'></file-scan-result-table>
      <div v-for="(result, name) in results" key="name">
        <file-scan-result-box :name='name' :matches='result'></file-scan-result-box>
      </div>
    </div>
  </div>
</template>

<script>
  import { PatternTypes } from '@/store/mutation-types'
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
        error: null
      }
    },
    computed: {
      ...mapGetters({
        patterns: PatternTypes.selected
      })
    },
    methods: {
      saveToDisk () {
        let filename = this.file.name + '.out.json'
        let data = {
          patterns: this.patterns,
          results: this.results
        }
        let blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        FileSaver.saveAs(blob, filename)
      },
      formatBytes (bytes) {
        return bytesToSize(bytes)
      },
      setPercent (percent, color) {
        if (percent) {
          this.$refs.progress.value = percent
          this.$refs.progress.text = percent + '%'
        }
        if (color) {
          this.$refs.progress.className = 'progress ' + color
        }
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
          self.setPercent(percent, 'is-warning')
          for (let name in regexs) {
            if (regexs.hasOwnProperty(name)) {
              let matches = Matcher(regexs[name], line, patterns[name])
              if (matches.length) {
                matches.forEach(function (match) {
                  self.processResult(match, name, line, linenumber, patterns[name])
                })
              }
            }
          }
          if (self.running) {
            next()
          }
        })

        reader.on('error', function (err) {
          self.setPercent(null, 'is-danger')
          self.error = err.toString()
          self.running = false
        })

        reader.on('end', function () {
          self.setPercent(100, 'is-success')
          self.running = false
        })

        reader.read(file)
      },
      startold () {
        let self = this
        self.running = true
        let file = this.file
        let reader = LineReader({ chunkSize: 10240 })
        let regexs = {}
        self.patterns.forEach(function (pattern) {
          self.results[pattern.name] = []
          regexs[pattern.name] = new RegExp(pattern.regex_string, 'gmi')
        })

        reader.on('line', function (line, next, percent) {
          self.setPercent(percent, 'is-warning')
          for (let name in regexs) {
            if (regexs.hasOwnProperty(name)) {
              let m = line.match(regexs[name])
              if (m) {
                let result = m.length > 1 ? m[1] : m[0]
                if (self.results[name].indexOf(result) === -1) { // ensure uniqueness
                  self.count += 1
                  self.results[name].push(result)
                }
              }
            }
          }
          if (self.running) {
            next()
          }
        })

        reader.on('error', function (err) {
          self.setPercent(null, 'is-danger')
          self.error = err.toString()
          self.running = false
        })

        reader.on('end', function () {
          self.setPercent(100, 'is-success')
          self.running = false
        })

        reader.read(file)
      },
      stop () {
        this.running = false
      }
    },
    components: {
      FileScanResultTable,
      FileScanResultTabs,
      FileScanResultBox
    }
  }
</script>
