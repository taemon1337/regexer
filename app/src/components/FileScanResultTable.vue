<template>
  <div style="overflow:auto;">
    <table class="table">
      <tbody>
        <tr v-for="(result, name) in results" key="name">
          <td>{{ name }}</td>
          <td>{{ result.length }}</td>
          <td>{{ result.join(', ') }}</td>
          <!--<td v-for="(value, index) in result[name]" key="index">{{ value }}</td>-->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'FileScanResultTable',
    props: {
      results: {
        type: Object,
        required: true
      }
    },
    data () {
      return {}
    }
  }
</script>
