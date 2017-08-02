<template>
  <div>
    <div v-for="(result, name) in results" key="name">
      <file-scan-result-box :name='name' :matches='result' :filter='filter'></file-scan-result-box>
    </div>
  </div>
</template>

<script>
  import FileScanResultBox from '@/components/FileScanResultBox'

  export default {
    name: 'FileScanResultBoxs',
    props: {
      results: {
        type: Object,
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
    components: {
      FileScanResultBox
    }
  }
</script>
