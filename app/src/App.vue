<template>
  <div id="app">
    <div class="container">
      <error-messages></error-messages>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import 'bulma'
  import 'font-awesome/css/font-awesome.css'
  import ErrorMessages from '@/components/ErrorMessages'
  
  export default {
    name: 'app',
    components: {
      ErrorMessages
    }
  }
</script>
