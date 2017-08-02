<template>
  <section>
    <label class="label">
      {{ name }}
      <span class="tag is-success">{{ computedMatches.length }}</span>
      <span @click="clone" class="icon" title="Copy to new dataset"><i class="fa fa-clone"></i></span>
    </label>
    <data-result textarea :result="computedMatches"></data-result>
  </section>
</template>

<script>
  import DataResult from '@/components/DataResult'
  import { DatasetTypes } from '@/store/mutation-types'

  export default {
    name: 'FileScanResultBox',
    props: {
      name: {
        type: String,
        required: true
      },
      matches: {
        type: Array,
        required: true
      },
      filter: {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    },
    methods: {
      clone () {
        console.log(this.computedMatches)
        let blob = new Blob(this.computedMatches, { type: 'text/plain' })
        blob.name = 'New ' + this.name
        this.$store.dispatch(DatasetTypes.add, blob)
      }
    },
    computed: {
      computedMatches () {
        let self = this
        let ret = []

        self.matches.forEach(function (match) {
          if (self.filter && match) {
            if (match.match(self.filter)) {
              ret.push(match)
            }
          } else {
            ret.push(match)
          }
        })

        return ret
      }
    },
    components: {
      DataResult
    }
  }
</script>
