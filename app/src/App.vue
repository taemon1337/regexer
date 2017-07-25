<template>
  <div id="app">
    <div class="container">
      <pattern-form-modal v-if="editing"></pattern-form-modal>
      <error-messages></error-messages>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import 'bulma'
  import 'font-awesome/css/font-awesome.css'
  import ErrorMessages from '@/components/ErrorMessages'
  import PatternFormModal from '@/components/PatternFormModal'
  import { PatternTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'app',
    computed: {
      ...mapGetters({
        editing: PatternTypes.edit
      })
    },
    components: {
      ErrorMessages,
      PatternFormModal
    }
  }
</script>
