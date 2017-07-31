<template>
  <div>
    <form class="box" @submit.prevent.stop>
      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <label class="label">Select File(s)</label>
            <input @change="fileSelected" class="is-hidden" type="file" ref="fileInput" multiple>
            <div class="control">
              <input @click="openDialog" class="input" type="text" placeholder="Select files...">
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="field">
            <label class="label">Paste Text</label>
            <div class="control">
              <textarea @change="textSelected" rows="2" class="textarea" placeholder="paste text data..."></textarea>
            </div>
          </div>
        </div>
      </div>
    </form>
    
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
      },
      textSelected (e) {
        let blob = new Blob([e.target.value], { type: 'text/plain' })
        this.selected.push(blob)
        e.target.value = ''
      }
    },
    components: {
      FileScan
    }
  }
</script>
