<template>
  <div id="home">
    <NavMenu />
    <div v-if="loaded">
      <div v-for="i in this.suggestions" :key="i" id="suggestions">
          <Suggestion class="sugg"
            :id="i"
          />
      </div>
    </div>
  </div>
</template>

<script>
import Suggestion from '../components/Suggestion.vue'
import NavMenu from '../components/NavMenu.vue'
import { apiGetAllSuggestions } from '../api/suggestion'

export default {
  name: 'Home',
  components: {
    Suggestion,
    NavMenu
  },
  data() {
    return {
      suggestions: [],
      loaded: false,
    }
  },
  methods: {
  },
  async mounted(){
    const suggestionsRequest = await apiGetAllSuggestions();
    const suggs = suggestionsRequest.data; 
    for (var i = 0; i<suggs.length; i++){
      this.suggestions.push(suggs[i]._id)
    }
    this.loaded = true;
  }
}
</script>

<style scoped>
#home{
   display: flex;
  justify-content: center; 
  flex-flow: column;
}
#suggestions {
  display: flex; 
  justify-content: space-evenly;
  flex-flow: row;
}
.sugg{
  margin: 40px;
}
</style>