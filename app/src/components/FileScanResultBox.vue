<template>
  <section>
    <label class="label">
      {{ name }}
      <span class="tag is-success">{{ computedMatches.length }}</span>
    </label>
    <data-result textarea :result="computedMatches"></data-result>
  </section>
</template>

<script>
  import DataResult from '@/components/DataResult'

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
