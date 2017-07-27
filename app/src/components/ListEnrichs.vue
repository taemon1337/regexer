<template>
  <section>
    <div style="margin-bottom:15px;">
      <strong>
        Enrichs
        <span v-if="selected.length">({{ selected.length }} selected)</span>
      </strong>
    </div>
    <article v-for="(enrich, index) in enrichs" key="index" class="">
      <div class="media">
        <figure class="media-left">
          <span @click="toggle(enrich)" class="icon is-medium has-text-success">
            <i :class="isSelected(enrich) ? 'fa fa-check-square-o' : 'fa fa-square-o'"></i>
          </span>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong @click="toggleId(enrich.id)">{{ enrich.name }}</strong>
            </p>
            <p v-if="current_id === enrich.id">
              {{ enrich.description }}
            </p>
          </div>
        </div>
        <div class="media-right">
          <span class="icon" @click="toggleId(enrich.id)">
            <i :class="current_id === enrich.id ? 'fa fa-angle-up' : 'fa fa-angle-down'"></i>
          </span>
        </div>
      </div>
      <div v-if="current_id === enrich.id">
        <div class="media">
          <div class="media-content" style="overflow:auto;">
            <dl>
              <dd><strong>Enrich:</strong></dd>
              <dt><pre>{{ enrich.regex_string }}</pre></dt>
              <dd><strong>Examples:</strong></dd>
              <dt><pre>{{ enrich.testresult }}</pre></dt>
            </dl>
          </div>
          <div class="media-right">
            <span class="icon" title="Edit Enrich" @click="edit(enrich)">
              <i class="fa fa-pencil"></i>
            </span>
          </div>
        </div>
        <hr>
      </div>
    </article>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { EnrichTypes } from '@/store/mutation-types'

  export default {
    name: 'ListEnrichs',
    data () {
      return {
        current_id: null
      }
    },
    computed: {
      ...mapGetters({
        enrichs: EnrichTypes.fetch,
        selected: EnrichTypes.selected
      })
    },
    methods: {
      toggle (enrich) {
        this.$store.dispatch(EnrichTypes.select, enrich)
      },
      toggleId (id) {
        this.current_id = this.current_id === id ? null : id
      },
      isSelected (enrich) {
        return this.selected.indexOf(enrich) !== -1
      },
      edit (enrich) {
        this.$store.dispatch(EnrichTypes.edit, enrich)
      }
    },
    created () {
      this.$store.dispatch(EnrichTypes.fetch)
    }
  }
</script>
