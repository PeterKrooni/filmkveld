<template>
  <div id="home">

    <!-- Spinner -->
    <div id="loader-container" style="height: 75vh; display: flex; align-items: center; flex-flow: column; justify-content: space-evenly;" v-if="!loaded">

      <SmallHeader style="margin-bottom: -200px;" :toptext="'Filmkveld'" :bottomtext="'Sponsored by coffee!'" id="load-header" />
      <div class="loader" v-if="!loaded"></div>
    </div>
    <NavMenu v-if="loaded" />

    <!-- Side view -->
    <div id="side-view" v-if="loaded">
      <div>
        <BigHeader :text="'Filmkveld'" />
      </div>
      
      <div>
        <SmallHeader :toptext="'Your profile!'" :bottomtext="'You are stuff!'" />
        <ProfileCard style="margin-top: 85px;" />
      </div>
      
      <div style="margin-top: 100px">
        <SmallHeader :toptext="'Add a movie'" :bottomtext="'Wooo!'" />
        <AddMovie style="margin-top: 20px;" />
      </div>

      <div>
      </div>
    </div>


    <!-- Suggestions view -->
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
        <div v-for="i in this.suggestions_m" :key="i" class="suggestions">
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
  </div>
</template>

<script>
import Suggestion from '../components/Suggestion.vue'
import AddMovie from '../components/AddMovie.vue'
import BigHeader from '../components/BigHeader.vue'
import SmallHeader from '../components/SmallHeader.vue'
import ProfileCard from '../components/profile/ProfileCard.vue'
import NavMenu from '../components/NavMenu.vue'
import { apiGetSuggestions } from '../api/rest/suggestions'

export default {
  name: 'Home',
  components: {
    Suggestion,
    AddMovie,
    BigHeader,
    SmallHeader,
    ProfileCard,
    NavMenu
  },
  data() {
    return {
      suggestions_l: [],
      suggestions_m: [],
      suggestions_r: [],
      loaded: false,
    }
  },
  methods: {
  },
  async mounted(){
    const allWithMovie = await apiGetSuggestions(true, true)
    const suggs = allWithMovie.data;
    var side = 0;
    for (var i = 0; i<suggs.length; i++){
      if (side == 0){
        this.suggestions_l.push(suggs[i])
        side ++
      }
      else if (side == 1){
        this.suggestions_m.push(suggs[i])
        side ++
      }
      else if (side == 2){
        this.suggestions_r.push(suggs[i])
        side ++
      }
      else{
        side = 0
      }
    }
    this.loaded = true      
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
#side-view{
  height: 95vh;
  display: flex;
  justify-content: space-evenly;
  flex-flow: column;
  margin-top: 50px;
}
#stats-header{  
  box-shadow: rgb(26, 112, 173) 0px 0px 0px 2px inset, #303841 10px -10px 0px -3px, rgb(18, 104, 17) 10px -10px, #303841 20px -20px 0px -3px, rgb(234, 195, 5) 20px -20px, #303841 30px -30px 0px -3px, rgb(85, 221, 255) 30px -30px, #303841 40px -40px 0px -3px, rgb(18, 150, 47) 40px -40px; padding: 5px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 15px;
  margin-top: 90px;
  margin-bottom: 40px;
}
#stats-section{
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  color: white;
  width: 23%;
  height: 84vh;
  margin: auto;
}
#top-suggestions-container{
  display: flex;
  width: 100%;
  flex-flow: row;
  justify-content: space-evenly;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 12px 12.5px, rgba(0, 0, 0, 0.12) 0px -2px 6px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 2px 3px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
 
}
#suggestions-section {
  scrollbar-color: #646a70 #3A4750; 
  scrollbar-width: thin;

  display: flex;
  flex-flow: row;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  
  height: 84vh;
  width: 1020px;
  overflow: hidden;
  margin-top: 5vh;
  margin-bottom: 5vh;  
  overflow-y: scroll;
  padding: 2vh;
  padding-left: 2vh;
  padding-right: 2vh;
}
.suggestions-container {
  display: flex;
  flex-flow: column;
}
.suggestions {
  display: flex; 
  justify-content: space-evenly;
  flex-flow: row;
  animation: fadeIn ease-out 1.25s;
  -webkit-animation: fadeIn ease-out 1.25s;
  -moz-animation: fadeIn ease-out 1.25s;
  -o-animation: fadeIn ease-out 1.25s;
  -ms-animation: fadeIn ease-out 1.25s;
}
.sugg{
  margin: 40px;
}

#interactions-section{
  width: 23%;
  height: 88vh;
}
@media screen and (min-width: 1400px){
  #suggestions-section{
    
    animation: expandSuggestionsContainer cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
    -webkit-animation: expandSuggestionsContainer cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
    -moz-animation: expandSuggestionsContainer cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
    -o-animation: expandSuggestionsContainer cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
    -ms-animation: expandSuggestionsContainer cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
  }
}
@media screen and (max-width: 1500px) {
  #stats-section {
    width: 28%;
    flex-flow: column;
  }
  #top-suggestions-container{
    flex-flow: column;
  }
  #suggestions-section {
  flex-flow: column;
    width: auto;
  }
  #interactions-section {
    width: 28%;
    flex-flow: column;
  }
  #suggestions-section{
    width: auto;
  }
}
@media screen and (max-width: 1000px) {
  #stats-section {
    width: 67%;
    flex-flow: column;
  }
  #interactions-section {
    width: 67%;
    flex-flow: column;
  }
}

#profile-container{
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 12px 12.5px, rgba(0, 0, 0, 0.12) 0px -2px 6px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 2px 3px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  
}
#profile-info{
  width: 200px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 1em;
  font-size: 12px;
}
#PP{
    border: 1px solid rgb(59, 57, 57);
    border-radius: 20em;
    height: 100px; 
    width: 100px; 
}
.profile-header{
  font-weight: lighter;font-size: 22px;color: #969ca3; letter-spacing: 1px;
}

.separator{
  width: 150px;
  height: 1px;
  transform: rotate3d(-10, -5, -4, 10deg);
  background-color: #797e84;
  margin: -20px;
  margin-top: -40px;
  display: flex;
  justify-content: center;
  color: rgb(113, 132, 141);
  font-size: 12px;
}

#load-header{
  animation: fadeIn linear 0.5s;
  -webkit-animation: fadeIn linear 0.5s;
  -moz-animation: fadeIn linear 0.5s;
  -o-animation: fadeIn linear 0.5s;
  -ms-animation: fadeIn linear 0.5s;
}

@keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}
@-moz-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-webkit-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-o-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-ms-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@keyframes expandSuggestionsContainer {
  0% {width: 25px; height: 5vh;}
  50% {height: 15vh;}
  100% {width: 1020px; height: 84vh;}
}
@-moz-keyframes expandSuggestionsContainer {
  0% {width: 25px;}
  100% {width: 1020px;}
}
@-webkit-keyframes expandSuggestionsContainer {
  0% {width: 25px;}
  100% {width: 1020px;}
}
@-o-keyframes expandSuggestionsContainer {
  0% {width: 25px;}
  100% {width: 1020px;}
}
@-ms-keyframes expandSuggestionsContainer {
  0% {width: 25px;}
  100% {width: 1020px;}
}
/*
 provided by Luke Haas from https://projects.lukehaas.me/css-loaders/
*/
.loader {
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: #ffffff;
  background: -moz-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -webkit-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -o-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: linear-gradient(to right, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #ffffff;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}
.loader:after {
  background: #303841;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>