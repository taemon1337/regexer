<template>
  <div>
    <div class="tabs is-fullwidth">
      <ul>
        <li v-for="(result, name) in results" key="name" :class="isActive(name) ? 'is-active' : ''">
          <a href='#' @click='active = name'>{{ name }}</a>
        </li>
      </ul>
    </div>
    <div v-if='active'>
      <file-scan-result-box :name='active' :matches='results[active]'></file-scan-result-box>
    </div>
  </div>
</template>

<script>
  import FileScanResultBox from '@/components/FileScanResultBox'

  export default {
    name: 'FileScanResultTabs',
    props: {
      results: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        active: null
      }
    },
    methods: {
      isActive (name) {
        return this.active === name
      }
    },
    mounted () {
      this.active = Object.keys(this.results)[0]
    },
    components: {
      FileScanResultBox
    }
  }
</script>
