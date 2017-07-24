<template>
  <form action='/api/patterns' method='post' ref='form'>
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input name="name" class="input" type="text" placeholder="unique name...">
      </div>
    </div>
    
    <div class="field">
      <label class="label">Regular Expression</label>
      <div class="field has-addons">
        <div class="control">
          <input name="regex_string" class="input" type="text" placeholder="^[a-z]+$">
        </div>
        <p class="control">
          <input name="regex_options" class="input" type="text" placeholder="gi" size='5'>
        </p>
      </div>
    </div>
    
    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea rows='3' name="description" class="textarea" placeholder="description..."></textarea>
      </div>
    </div>
    
    <div class="field">
      <label class="label">Should Match</label>
      <div class="control">
        <textarea rows='4' name="should_match" class="textarea" placeholder="each line of text should match regex..."></textarea>
      </div>
    </div>
    
    <div class="field">
      <label class="label">Should <strong>NOT</strong> Match</label>
      <div class="control">
        <textarea rows='4' name="should_not_match" class="textarea" placeholder="each line of text should NOT match regex..."></textarea>
      </div>
    </div>

  <div class="field is-grouped">
    <div class="control">
      <button :disabled='!passedtest' type="submit" class="button is-primary">Submit</button>
    </div>
    <div class="control">
      <button type="button" @click='test' class="button is-primary">Test</button>
    </div>
    <div class="control">
      <button class="button is-link">Cancel</button>
    </div>
  </div>

  </form>
</template>

<script>
  import serializeForm from '@/lib/serializeForm'
  import matchall from '@/lib/matchall'
  import { MessageTypes } from '@/store/mutation-types'
  import Api from '@/api'

  export default {
    name: 'NewPatternForm',
    data () {
      return {
        passedtest: false
      }
    },
    methods: {
      test () {
        let formdata = serializeForm(this.$refs.form)
        let test = this.dotest(formdata)
        if (test.passed) {
          this.passedtest = true
        } else {
          this.fail(test)
        }
      },
      dotest (formdata) {
        let shouldMatch = matchall(formdata.regex_string, formdata.regex_options, formdata.should_match)
        let shouldMatchCount = formdata.should_match.split('\n').length
        let shouldNotMatch = matchall(formdata.regex_string, formdata.regex_options, formdata.should_not_match)
        return {
          passed: (shouldMatch.length === shouldMatchCount && shouldNotMatch.length === 0),
          should_match: shouldMatch,
          should_not_match: shouldNotMatch
        }
      },
      fail (test) {
        this.passedtest = false
        this.$store.dispatch(MessageTypes.add, { title: 'Did not pass test!', klass: 'notification is-danger', content: '<pre>' + JSON.stringify(test, null, 2) + '</pre>' })
      },
      save (e) {
        let formdata = serializeForm(this.$refs.form)
        let test = this.dotest(formdata)
        if (test.passed) {
          Api.patterns.save(formdata)
        } else {
          this.fail(test)
        }
      }
    }
  }
</script>
