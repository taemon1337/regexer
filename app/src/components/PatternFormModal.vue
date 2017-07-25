<template>
  <div class="modal is-active" ref='modal'>
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create your own pattern</p>
        <button class="delete" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent.stop='save' action='/api/patterns' method='post' ref='form'>
          <input v-if="current && current.id" type='hidden' name='id'>
          
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input @change='docantest' name="name" class="input" type="text" placeholder="unique name..." required>
            </div>
          </div>
          
          <div class="field">
            <label class="label">Regular Expression</label>
            <div class="control">
              <input @change='docantest' name="regex_string" class="input" type="text" placeholder="extracting regex for a single line...([a-z]+)" required>
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
                <label class="label">Example Input Text</label>
                <div class="control">
                  <textarea rows='4' name="testdata" class="textarea" placeholder="lines of example data..."></textarea>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Expected Parsed Result</label>
                <div class="control">
                  <textarea rows='4' name="testresult" class="textarea" placeholder="what the regex should produce from evaluating each line..."></textarea>
                </div>
              </div>
            </div>
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

            <div class="column is-half">
              <div class="field">
                <label class="label">Parsed Test Result</label>
                <div class="control">
                  <pre>{{ result }}</pre>
                </div>
              </div>
            </div>
            <div class="column is-half">
              <div class="field">
                <label class="label">Extracted Test Result</label>
                <div class="control">
                  <pre>{{ result.map(function (r) { return r.parsed }).join('\n') }}</pre>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
          <button @click.prevent="save" :disabled='!passedtest' type="button" class="button is-primary">Save</button>
          <button :disabled='!cantest' type="button" @click='test' class="button is-primary">Test</button>
          <button @click='close' class="button">Cancel</button>
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
  import matchall from '@/lib/matchall'
  import { PatternTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'PatternFormModal',
    data () {
      return {
        cantest: false,
        passedtest: false,
        result: null,
        reason: null
      }
    },
    computed: {
      ...mapGetters({
        editing: PatternTypes.edit,
        current: PatternTypes.current
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
        if (formdata.name && formdata.regex_string) {
          this.cantest = true
        }
      },
      dotest (formdata) {
        let result = matchall(formdata.regex_string, formdata.testdata)
        let resulttext = result.map(function (r) { return r.parsed }).join('\n')
        let passed = formdata.regex_string && resulttext === formdata.testresult
        let comp = passed ? ' equals ' : ' does not equal '
        this.result = result
        this.reason = 'Parsed example data ' + comp + ' the expected parsed result.'
        this.passedtest = passed
      },
      save (e) {
        let formdata = serializeForm(this.$refs.form)
        this.dotest(formdata)
        if (this.passedtest) {
          this.$store.dispatch(PatternTypes.save, formdata)
        }
      },
      remove () {
        if (this.current && this.current.id) {
          let a = confirm('Are you sure you want to delete this pattern? ' + this.current.name)
          if (a) {
            this.$store.dispatch(PatternTypes.remove, this.current)
            this.close()
          }
        }
      },
      close () {
        this.$store.dispatch(PatternTypes.unedit)
      }
    },
    mounted () {
      if (this.current && this.$refs.form) {
        this.cantest = true
        injectForm(this.$refs.form, this.current)
      }
    }
  }
</script>
