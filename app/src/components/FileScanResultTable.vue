<template>
  <div style="overflow-y:auto;padding:7px;">
    <table class="table is-bordered is-striped is-narrow">
      <thead>
        <tr>
          <th>Index</th>
          <th style='min-width:200px;'>Pattern</th>
          <th>Match</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td colspan='3'>
            <nav class="pagination is-centered is-small">
              <span>Total: {{ totalItems }}</span>
              <a class="pagination-previous" title="Previous Page" @click="prevPage > 0 ? currentPage = prevPage : null" :disabled="prevPage < 1">
                <span class="icon"><i class="fa fa-angle-left"></i></span>
              </a>
              <a class="pagination-next" title="Next Page" @click="nextPage > totalPages ? null : currentPage = nextPage" :disabled="nextPage > totalPages">
                <span class="icon"><i class="fa fa-angle-right"></i></span>
              </a>
              <ul class="pagination-list">
                <li v-if="currentPage > 2"><a @click="currentPage = 1" class="pagination-link">1</a></li>
                <li v-if="currentPage > 3"><span class="pagination-ellipsis">&hellip;</span></li>
                <li v-if="currentPage > 1"><a @click="currentPage = prevPage" class="pagination-link">{{ prevPage }}</a></li>
                <li><a class="pagination-link is-current">{{ currentPage }}</a></li>
                <li v-if="currentPage < totalPages"><a @click="currentPage = nextPage" class="pagination-link">{{ nextPage }}</a></li>
                <li v-if="totalPages - currentPage > 2"><span class="pagination-ellipsis">&hellip;</span></li>
                <li v-if="totalPages - currentPage > 1"><a @click="currentPage = totalPages" class="pagination-link">{{ totalPages }}</a></li>
              </ul>
            </nav>
          </td>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="obj in flatResults" key="name">
          <td>{{ obj.index }}</td>
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
      },
      filter: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        totalItems: 1,
        currentPage: 1,
        pageSize: 10
      }
    },
    computed: {
      flatResults () {
        let self = this
        let i = 1
        let a = []
        for (let name in self.results) {
          self.results[name].forEach(function (match) {
            if (self.filter && match) {
              if (match.match(self.filter) || name.match(self.filter)) {
                a.push({ index: i, name: name, match: match })
                i += 1
              }
            } else {
              a.push({ index: i, name: name, match: match })
              i += 1
            }
          })
        }
  
        this.totalItems = a.length
        this.currentPage = this.currentPage > Math.ceil(a.length / this.pageSize) ? 1 : this.currentPage // reset current page if needed (during a filter)
        let to = this.currentPage * this.pageSize
        let from = to - this.pageSize
        return a.slice(from, to)
      },
      nextPage () {
        return this.currentPage + 1
      },
      prevPage () {
        return this.currentPage - 1
      },
      totalPages () {
        return Math.ceil(this.totalItems / this.pageSize)
      }
    }
  }
</script>
