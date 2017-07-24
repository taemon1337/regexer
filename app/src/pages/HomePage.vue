<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Pattern Matcher
          </h1>
          <h2 class="subtitle">
            Scan files for matching text patterns!
          </h2>
        </div>
      </div>
    </section>
    <section class="columns">
      <div class="column">
        <h1 class="title">Scan files to selected patterns</h1>
        <new-scan-form></new-scan-form>
      </div>
      <div class="column">
        <h1 class="title">Available Patterns</h1>
        <list-patterns></list-patterns>
      </div>
      <div class="column">
        <h1 class="title">Create your own pattern</h1>
        <new-pattern-form></new-pattern-form>
      </div>
    </section>
  </div>
</template>

<script>
  import NewScanForm from '@/components/NewScanForm'
  import ListPatterns from '@/components/ListPatterns'
  import NewPatternForm from '@/components/NewPatternForm'

  export default {
    name: 'HomePage',
    data () {
      return {}
    },
    components: {
      NewScanForm,
      ListPatterns,
      NewPatternForm
    }
  }
</script>
