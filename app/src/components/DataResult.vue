<template>
  <div>
    <textarea v-if="textarea" class="textarea">{{ result | stringify }}</textarea>
    <pre v-else>{{ result | stringify }}</pre>
  </div>
</template>

<script>
  export default {
    name: 'DataResult',
    props: {
      result: {
        type: [Object, Array, String, Number],
        required: true
      },
      textarea: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    }
  }
</script>
