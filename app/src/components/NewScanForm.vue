<template>
  <div>
    <form @submit.prevent.stop="submit">
      <div class="field">
        <label class="label">Select File(s)</label>
        <input @change="fileSelected" class="is-hidden" type="file" ref="fileInput" multiple>
        <div class="control">
          <input @click="openDialog" class="input" type="text" placeholder="Select files...">
        </div>
      </div>
    </form>
    <br>
    
    <div v-for="(file, index) in selected" key="index" class="box">
      <file-scan :file='file'></file-scan>
    </div>
  </div>
</template>

<script>
  import FileScan from '@/components/FileScan'

  export default {
    name: 'NewScanForm',
    data () {
      return {
        selected: []
      }
    },
    methods: {
      openDialog () {
        this.$refs.fileInput.click()
      },
      fileSelected (e) {
        this.selected = e.target.files
      }
    },
    components: {
      FileScan
    }
  }
</script>
