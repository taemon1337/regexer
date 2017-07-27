<template>
  <section>
    <div style="margin-bottom:15px;">
      <strong>
        Patterns
        <span v-if="selected.length">({{ selected.length }} selected)</span>
      </strong>
    </div>
    <article v-for="(pattern, index) in patterns" key="index" class="">
      <div class="media">
        <figure class="media-left">
          <span @click="toggle(pattern)" class="icon is-medium has-text-success">
            <i :class="isSelected(pattern) ? 'fa fa-check-square-o' : 'fa fa-square-o'"></i>
          </span>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong @click="toggleId(pattern.id)">{{ pattern.name }}</strong>
            </p>
            <p v-if="current_id === pattern.id">
              {{ pattern.description }}
            </p>
          </div>
        </div>
        <div class="media-right">
          <span class="icon" @click="toggleId(pattern.id)">
            <i :class="current_id === pattern.id ? 'fa fa-angle-up' : 'fa fa-angle-down'"></i>
          </span>
        </div>
      </div>
      <div v-if="current_id === pattern.id">
        <div class="media">
          <div class="media-content" style="overflow:auto;">
            <dl>
              <dd><strong>Pattern:</strong><small :title="'SHA256:' + pattern.regex_sha256">{{ patternId(pattern) }} &hellip;</small></dd>
              <dt><pre>{{ pattern.regex_string }}</pre></dt>
              <dd><strong>Examples:</strong></dd>
              <dt><pre>{{ pattern.testresult }}</pre></dt>
            </dl>
          </div>
          <div class="media-right">
            <span class="icon" title="Edit Pattern" @click="edit(pattern)">
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
  import { PatternTypes } from '@/store/mutation-types'

  export default {
    name: 'ListPatterns',
    data () {
      return {
        current_id: null
      }
    },
    computed: {
      ...mapGetters({
        patterns: PatternTypes.fetch,
        selected: PatternTypes.selected
      })
    },
    methods: {
      toggle (pattern) {
        this.$store.dispatch(PatternTypes.select, pattern)
      },
      toggleId (id) {
        this.current_id = this.current_id === id ? null : id
      },
      isSelected (pattern) {
        return this.selected.indexOf(pattern) !== -1
      },
      edit (pattern) {
        this.$store.dispatch(PatternTypes.edit, pattern)
      },
      patternId (pattern) {
        return pattern.regex_sha256 ? pattern.regex_sha256.substring(0, 8) : ''
      }
    },
    created () {
      this.$store.dispatch(PatternTypes.fetch)
    }
  }
</script>
