<template>
  <div id="home">
    <NavMenu />
    <div id="stats-section">
      <h1>im stuff</h1>
      <p>Stats go here, stuff like what user that has submnitted most,
        your profile?, most want-to-see movies, highest voted movies
      </p>
    </div>

    <div id="suggestions-section" v-if="loaded">
      <div class="suggestions-container">
        <div v-for="i in this.suggestions_l" :key="i" class="suggestions">
            <Suggestion class="sugg"
              :preloaded="true"
              :preloadedData="i"
            />
        </div>
      </div>
      <div class="suggestions-container">
        <div v-for="i in this.suggestions_r" :key="i" class="suggestions">
            <Suggestion class="sugg"
              :preloaded="true"
              :preloadedData="i"
            />
        </div>
      </div>
    </div>

    <div id="interactions-section">
      <h1>im stuff</h1>
      <p>Interactions go here, stuff like 
        creating movie nights, interactible things, marking movies as seen?
      </p>
    </div>
  </div>
</template>

<script>
import Suggestion from '../components/Suggestion.vue'
import NavMenu from '../components/NavMenu.vue'
import { apiGetSuggestions } from '../api/rest/suggestions'

export default {
  name: 'Home',
  components: {
    Suggestion,
    NavMenu
  },
  data() {
    return {
      suggestions_l: [],
      suggestions_r: [],
      loaded: false,
    }
  },
  methods: {
  },
  async mounted(){
    const allWithMovie = await apiGetSuggestions(true, true)
    const suggs = allWithMovie.data;
    for (var i = 0; i<suggs.length; i++){
      if (i%2==0){
        this.suggestions_l.push(suggs[i])
      }else{
        this.suggestions_r.push(suggs[i])
      }
    }      
    this.loaded = true;
  }
}
</script>

<style scoped>
#home{
  display: flex;
  align-items: center; 
  justify-content: space-evenly;
  flex-flow: row;
}
@media screen and (max-width: 1000px) {
  #home {
  flex-flow: column;
  }
}
.label{
  color: rgba(160, 179, 192, 0.445);
  text-align: center;
  margin-bottom: -60px;
  font-size: 20px;
}

#stats-section{
  background-color: rgb(212, 157, 157);
  width: 23%;
  height: 88vh;
}
@media screen and (max-width: 1400px) {
  #stats-section {
    width: 28%;
    flex-flow: column;
  }
}
@media screen and (max-width: 1000px) {
  #stats-section {
    width: 67%;
    flex-flow: column;
  }
}

#suggestions-section {
  scrollbar-color: #646a70 #3A4750; 
  scrollbar-width: thin;

  display: flex;
  flex-flow: row;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  
  height: 84vh;
  overflow: hidden;
  margin-top: 5vh;
  margin-bottom: 5vh;  
  overflow-y: scroll;
  padding: 2vh;
  padding-left: 2vh;
  padding-right: 2vh;
}
@media screen and (max-width: 1400px) {
  #suggestions-section {
  flex-flow: column;
  }
}
.suggestions-container {
  display: flex;
  flex-flow: column;
}
.suggestions {
  display: flex; 
  justify-content: space-evenly;
  flex-flow: row;
}
.sugg{
  margin: 40px;
}

#interactions-section{
  background-color: rgb(161, 161, 202);
  width: 23%;
  height: 88vh;
}
@media screen and (max-width: 1400px) {
  #interactions-section {
    width: 28%;
    flex-flow: column;
  }
}
@media screen and (max-width: 1000px) {
  #interactions-section {
    width: 67%;
    flex-flow: column;
  }
}
</style>