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
                Scan files for matching text patterns!<br>
                Enrich matched patterns using custom scripts!
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
      <div :class="fullscreen ? 'column is-12' : 'column is-half'" style="max-width:100%;">
        <h1 class="title">Select files or Paste data to get started...</h1>
        <new-scan-form></new-scan-form>
        <br>
        <div v-for="(dataset, index) in datasets" key="index" class="box">
          <dataset-scan :dataset='dataset'></dataset-scan>
        </div>
      </div>
      <div v-if="!fullscreen" class="column is-half">
        <h1 class="title">Available Patterns</h1>
        <list-patterns></list-patterns>
        <hr>
        <div class="is-pulled-right">
          <button class="button is-primary" @click="createEnrich">
            Create Enrichment
          </button>
        </div>
        <h1 class="title">Available Enrichments</h1>
        <list-enrichs></list-enrichs>
      </div>
    </section>
  </div>
</template>

<script>
  import NewScanForm from '@/components/NewScanForm'
  import ListPatterns from '@/components/ListPatterns'
  import ListEnrichs from '@/components/ListEnrichs'
  import DatasetScan from '@/components/DatasetScan'
  import { PatternTypes, EnrichTypes, GlobalTypes, DatasetTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'HomePage',
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        fullscreen: GlobalTypes.fullscreen,
        datasets: DatasetTypes.all
      })
    },
    methods: {
      createPattern () {
        this.$store.dispatch(PatternTypes.edit)
      },
      createEnrich () {
        this.$store.dispatch(EnrichTypes.edit)
      }
    },
    components: {
      NewScanForm,
      ListPatterns,
      ListEnrichs,
      DatasetScan
    }
  }
</script>
