<template>
  <section>
    <label class="label">
      {{ name }}
      <span class="tag is-success">{{ matches.length }}</span>
    </label>
    <textarea class="textarea">{{ matches.join("\n") }}</textarea>
  </section>
</template>

<script>
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
      }
    },
    data () {
      return {}
    }
  }
</script>
