<template>
  <div class="modal is-active" ref='modal'>
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create your own enrichment</p>
        <button class="delete" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent.stop='save' action='/api/enrichs' method='post' ref='form'>
          <input v-if="current && current.id" type='hidden' name='id'>
          
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input @change='docantest' name="name" class="input" type="text" placeholder="unique name..." required>
            </div>
          </div>
            
          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <textarea rows='3' name="description" class="textarea" placeholder="description..."></textarea>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Accepted Patterns</label>
                <div class="select is-multiple">
                  <select @change='selectPatternsChanged' name="accepted_patterns" multiple size="4" required>
                    <option v-for="(pattern, index) in patterns" key="index" :value="pattern.id">{{ pattern.name }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="column">
              <label class="checkbox">
                <input name="batchable" type="checkbox" value="1" :checked='current.batchable'>
                Enable Batch Processing
              </label>
              <div class="notification thin">
                Enabling batch processing will provide an array of matches to the enrich function instead of a single.
              </div>
              <!--<label class="checkbox">-->
              <!--  <input name="cacheable" type="checkbox" value="1" checked>-->
              <!--  Cache Results-->
              <!--</label>-->
              <!--<div class="notification thin">-->
              <!--  Caching should be used when the same input will always be enriched with the same output-->
              <!--</div>-->
            </div>
          </div>
            
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Pattern Input</label>
                <div class="control">
                  <pre>{{ testData }}</pre>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Expected Parsed Result</label>
                <div class="control">
                  <textarea ref='testresult' rows='4' name="testresult" class="textarea" placeholder="what the regex should produce from evaluating each line..."></textarea>
                </div>
              </div>
            </div>
          </div>
          
          <div class="field">
            <label class="label">
              Enrich Function
              <span v-if="!enrichfn.error" class="icon has-text-success"><span class="fa fa-check"></span></span>
              <span v-else class="icon has-text-danger"><span class="fa fa-remove"></span></span>
            </label>
            <small>A function to enrich a pattern match</small>
            <div class="control">
              <textarea @change="validateEnrich" name="enrich_function" class="textarea" :placeholder="enrichfn.default_enrich">{{ enrichfn.default_enrich }}</textarea>
              <span v-if="enrichfn.error" class="has-text-danger">{{ enrichfn.error }}</span>
            </div>
            <ul class="notification thin">
              <li>*First arg to the enrich function is a match value or an array of matched values (for batch mode)</li>
              <li>*2nd arg is <a target="_blank" href='https://github.com/mzabriskie/axios'>Axios</a> which is a http library for javascript for remote enrichments.</li>
              <li>*Enrich functions may return a value or an array of values if using batch mode</li>
              <li>*Enrich functions may also return a Promise which resolves a value or an array of values</li>
            </ul>
          </div>
          
          <div v-if="result" class="columns is-multiline">
            <div class="column is-12">
              <div v-if="passedtest" class="notification is-success">
                <button @click="resettest" class="delete"></button>
                <span class="icon is-medium">
                  <i class="fa fa-check"></i>
                </span>
                <p class="title">Passed!</p>
                <small>{{ reason }}</small>
              </div>
              <div v-else class="notification is-danger">
                <button @click="resettest" class="delete"></button>
                <span class="icon is-medium has-text-danger">
                  <i class="fa fa-remove"></i>
                </span>
                <p class="title">Failed!</p>
                <small>{{ reason }}</small>
              </div>
            </div>

            <div class="field column is-12">
              <label class="label">Test Result</label>
              <div class="control">
                <pre>{{ result.join('\n') }}</pre>
              </div>
            </div>
          </div>
          
          <div class="field">
            <div class="is-pulled-right">
              <span @click="advanced = !advanced" class="icon">
                <i :class="advanced ? 'fa fa-angle-up' : 'fa fa-angle-down'"></i>
              </span>
            </div>
            <label @click="advanced = !advanced" class="label">Advanced</label>
          </div>
          
          <div v-if="advanced">
            <hr>
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Batch Size</label>
                  <div class="control">
                    <input name="batch_size" class="input" type="number" placeholder="100">
                  </div>
                  <small>Only effective if using batch mode.</small>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Max Per Minute</label>
                  <div class="control">
                    <input name="max_per_minute" class="input" type="number" placeholder="150">
                  </div>
                  <small>Max number of batches to process in a single minute.</small>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label">
                Post Processing
                <span v-if="!postprocess.error" class="icon has-text-success"><span class="fa fa-check"></span></span>
                <span v-else class="icon has-text-danger"><span class="fa fa-remove"></span></span>
              </label>
              <small>Custom processing function for each parsed value</small>
              <div class="control">
                <textarea @change="validatePostprocess" name="for_each_result" class="textarea" :placeholder="postprocess.default_postprocess">{{ postprocess.default_postprocess }}</textarea>
                <span v-if="postprocess.error" class="has-text-danger">{{ postprocess.error }}</span>
              </div>
            </div>

            <strong>Example Functions</strong>
            <pre style="white-space: pre-wrap;padding:7px;">{{ examples.join('\n') }}</pre>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
          <button @click.prevent="save" :disabled='!passedtest' type="button" class="button is-primary">Save</button>
          <button :disabled='!cantest' type="button" @click='test' class="button is-primary">Test</button>
          <button @click='close' class="button">Cancel</button>
          <button type="button" @click='forcePass' class="button is-warning">Force Pass</button>
          <div class="is-pulled-right" style="float:right;">
            <button v-if="current && current.id" @click='remove' class="button" title="Delete">
              <span class="icon has-text-danger">
                <i class="fa fa-trash"></i>
              </span>
            </button>
          </div>
      </footer>
    </div>
  </div>
</template>

<script>
  import serializeForm from '@/lib/serializeForm'
  import injectForm from '@/lib/injectForm'
  import { EnrichTypes, PatternTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import textToFunction from '@/lib/textToFunction'
  import Enricher from '@/lib/Enricher'
  import DataResult from '@/components/DataResult'

  export default {
    name: 'EnrichFormModal',
    data () {
      return {
        cantest: false,
        passedtest: false,
        result: null,
        reason: null,
        testData: '',
        enrichfn: {
          error: null,
          default_enrich: 'function (match, axios) { return match }'
        },
        postprocess: {
          error: null,
          default_postprocess: 'function (value, input, enrich) { return value; }'
        },
        advanced: false,
        examples: [
          '# Simple example (not batch mode) \nfunction (match, axios) { \n  return match.substring(0, 10); \n}',
          '# Simple example (batch mode) \nfunction (matches, axios) { \n  return matches.map(function (match) { \n    return match.substring(0, 10) \n  }); \n}',
          '# Simple example returns a Promise \nfunction (match, axios) { \n  return new Promise(function (resolve, reject) { \n    resolve(match.substring(0, 10)) \n  }); \n}',
          '# Batch mode remote api query \nfunction (matches, axios) { \n  var data = matches.map(function (m) { return { query: m }});\n  return axios.post("http://ip-api.com/batch", data) \n}'
        ]
      }
    },
    computed: {
      ...mapGetters({
        editing: EnrichTypes.edit,
        current: EnrichTypes.current,
        patterns: PatternTypes.fetch
      })
    },
    methods: {
      test () {
        let formdata = serializeForm(this.$refs.form)
        this.dotest(formdata)
      },
      resettest () {
        this.result = null
        this.reason = null
      },
      docantest () {
        let formdata = serializeForm(this.$refs.form)
        if (formdata.name && formdata.enrich_function) {
          this.cantest = true
        }
      },
      dotest (enrich) {
        let self = this
        let batch = self.testData.split('\n')
        Enricher(batch, enrich).then(function (results) {
          let passed = enrich.enrich_function && results.join('\n') === enrich.testresult
          let comp = passed ? ' equals ' : ' does not equal '
          self.result = results
          self.reason = 'Parsed example data ' + comp + ' the expected parsed result.'
          self.passedtest = passed
        }).catch(function (err) {
          console.warn('Failed Test: ', err)
          self.passedtest = false
          self.reason = err.toString()
        })
      },
      save (e) {
        let formdata = serializeForm(this.$refs.form)
        this.dotest(formdata)
        if (this.passedtest) {
          this.$store.dispatch(EnrichTypes.save, formdata)
        }
      },
      remove () {
        if (this.current && this.current.id) {
          let a = confirm('Are you sure you want to delete this enrich? ' + this.current.name)
          if (a) {
            this.$store.dispatch(EnrichTypes.remove, this.current)
            this.close()
          }
        }
      },
      close () {
        this.$store.dispatch(EnrichTypes.unedit)
      },
      validateFunction (key, e) {
        if (textToFunction(e.target.value)) {
          this[key].error = null
        } else if (!e.target.value) {
          this[key].error = null
        } else {
          this[key].error = 'Invalid Function! ' + e.target.value
        }
      },
      validateEnrich: function (e) {
        this.validateFunction('enrichfn', e)
        this.docantest()
      },
      validatePostprocess: function (e) {
        this.validateFunction('postprocess', e)
        this.docantest()
      },
      selectPatternsChanged (e) {
        let formdata = serializeForm(this.$refs.form)
        this.setTestData(formdata)
      },
      setTestData (enrich) {
        let td = []
        this.patterns.forEach(function (p) {
          if (enrich.accepted_patterns.indexOf(p.id) >= 0) {
            td.push(p.testresult)
          }
        })
        this.testData = td.join('\n')
      },
      forcePass () {
        this.$refs.testresult.value = this.result.join('\n')
        this.passedtest = true
      }
    },
    created () {
      if (this.current) {
        if (this.current.for_each_result) {
          this.advanced = true
        }
      }
    },
    mounted () {
      if (this.current) {
        if (this.$refs.form) {
          this.cantest = true
          injectForm(this.$refs.form, this.current)
        }
        this.setTestData(this.current)
      }
    },
    components: {
      DataResult
    }
  }
</script>

<style scoped="true">
  .thin {
    font-size:10px;
    padding:7px;
  }
</style>
