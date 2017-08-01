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
  </div>
</template>

<script>
  import { DatasetTypes } from '@/store/mutation-types'

  export default {
    name: 'NewScanForm',
    data () {
      return {}
    },
    methods: {
      openDialog () {
        this.$refs.fileInput.click()
      },
      fileSelected (e) {
        for (let i = 0; i < e.target.files.length; i += 1) {
          this.$store.dispatch(DatasetTypes.add, e.target.files[i])
        }
      },
      textSelected (e) {
        let blob = new Blob([e.target.value], { type: 'text/plain' })
        blob.name = 'New Data ' + Math.random().toString().replace('.', '').slice(0, 6)
        this.$store.dispatch(DatasetTypes.add, blob)
        e.target.value = ''
      }
    }
  }
</script>
