<template>
  <div style="overflow:auto;">
    <table class="table">
      <thead>
        <tr>
          <th style='min-width:200px;'>Pattern</th>
          <th>Match</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="obj in flatResults" key="name">
          <td>{{ obj.name }}</td>
          <td>{{ obj.match }}</td>
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
    },
    computed: {
      flatResults () {
        let a = []
        for (let name in this.results) {
          this.results[name].forEach(function (match) {
            a.push({ name: name, match: match })
          })
        }
        return a
      }
    }
  }
</script>
