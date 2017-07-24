<template>
  <section>
    <div style="margin-bottom:15px;">
      <strong>Patterns</strong>
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
              <strong>{{ pattern.name }}</strong>
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
        <div>
          <strong>Pattern:</strong>
          <small>{{ pattern.regex_string }} {{ pattern.regex_options }}</small>
        </div>
        <div v-if="pattern.should_match">
          <strong>Examples:</strong>
          <ul>
            <li v-for="(ex, index) in pattern.should_match.split('\n')" key="index">{{ ex }}</li>
          </ul>
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
      }
    },
    created () {
      this.$store.dispatch(PatternTypes.fetch)
    }
  }
</script>
