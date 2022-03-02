<template>
  <div id="app">
    <Suggestion class="sugg" />
    <Suggestion class="sugg" />
  </div>
</template>

<script>
import Suggestion from './components/Suggestion.vue'

export default {
  components: {
    Suggestion
  }
}
</script>

<style scoped>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex; 
  justify-content: space-evenly;
  flex-flow: row;
}
.sugg{
  margin: 50px;
}
</style>
