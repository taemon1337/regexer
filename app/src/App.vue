<template>
  <div id="app">
    <div class="container">
      <pattern-form-modal v-if="editingPattern"></pattern-form-modal>
      <enrich-form-modal v-if="editingEnrich"></enrich-form-modal>
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
  import EnrichFormModal from '@/components/EnrichFormModal'
  import { PatternTypes, EnrichTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'app',
    computed: {
      ...mapGetters({
        editingPattern: PatternTypes.edit,
        editingEnrich: EnrichTypes.edit
      })
    },
    components: {
      ErrorMessages,
      PatternFormModal,
      EnrichFormModal
    }
  }
</script>
