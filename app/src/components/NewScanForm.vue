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
      <div class="media">
        <div class="media-left"></div>
        <div class="content">
          <strong>{{ file.name }}</strong>
        </div>
        <div class="media-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
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
    }
  }
</script>
