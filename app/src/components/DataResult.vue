<template>
  <div>
    <textarea v-if="textarea" class="textarea">{{ computedResult }}</textarea>
    <pre v-else>{{ computedResult }}</pre>
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
    },
    computed: {
      computedResult (obj) {
        if (typeof obj === 'object') {
          return obj
        } else {
          return obj
        }
      }
    }
  }
</script>
