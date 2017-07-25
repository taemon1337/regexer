<template>
  <div>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="columns">
            <div class="column">
              <h1 class="title">
                Pattern Matcher
              </h1>
              <h2 class="subtitle">
                Scan files for matching text patterns!
              </h2>
            </div>
            <div class="column">
              <button class="button is-large is-primary" @click="createPattern">
                Create your own Pattern
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="columns">
      <div class="column is-half">
        <h1 class="title">Scan files to selected patterns</h1>
        <new-scan-form></new-scan-form>
      </div>
      <div class="column is-half">
        <h1 class="title">Available Patterns</h1>
        <list-patterns></list-patterns>
      </div>
    </section>
  </div>
</template>

<script>
  import NewScanForm from '@/components/NewScanForm'
  import ListPatterns from '@/components/ListPatterns'
  import { PatternTypes } from '@/store/mutation-types'

  export default {
    name: 'HomePage',
    data () {
      return {}
    },
    methods: {
      createPattern () {
        this.$store.dispatch(PatternTypes.edit)
      }
    },
    components: {
      NewScanForm,
      ListPatterns
    }
  }
</script>
