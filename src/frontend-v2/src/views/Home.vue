<template>
  <div id="home">

    <!-- Spinner -->
    <div id="loader-container" style="height: 75vh; display: flex; align-items: center; flex-flow: column; justify-content: space-evenly;" v-if="!loaded">

      <SmallHeader style="" :toptext="'Filmkveld'" :bottomtext="'Sponsored by coffee!'" id="load-header" />
      <div class="loader" v-if="!loaded"></div>
      <div v-if="false"
        id="loader-outer"
        :style="'background: linear-gradient(0deg, rgba(238,238,238,1)' + this.loader_progress + '%, rgb(133, 143, 149) ' + this.loader_progress + '%); '"></div>
    </div>
    <NavMenu v-if="loaded" />

    <!-- Side view -->
    <div id="side-view" v-if="loaded">
      
      
      <div id="logo">
        <img src="../assets/filmkveld.logo.png" style="width: 400px;" alt="">
      </div>
      <div class="side-section">
        <SmallHeader :toptext="'Add a movie'" :bottomtext="'IMDB Integration by parts!'" />
        <AddMovie id="addmovie" @added="movieAdded" />
      </div>
      

      <div class="side-section">
        <SmallHeader :toptext="'Your profile!'" :bottomtext="'You are stuff!'" />
        <ProfileCard style="margin-top: 75px;" />
      </div>
      
      <div class="side-section" style="margin-bottom: 50px;">
        <KarmaLeaderBoard />
      </div>
    </div>

    <!-- Suggestions view -->
    <div v-if="loaded" style="position: relative;">
      <div id="suggestion-topbar">
        <div style="height: 42px; width: 340px;"><Search v-if="loaded" @onInput="searchInput" style="height: 30px; margin-left: 40px;" /></div>
      </div>
    <div id="suggestions-section" v-if="loaded">
      <div class="suggestions-container">

        <div v-for="i in this.suggestions_l" :key="i" class="suggestions">
            <Suggestion class="sugg"
              @delete="this.deleteSuggestion(i._id)"
              :preloaded="true"
              :preloadedData="i"
              :settings="this.settings"
            />
        </div>
      </div>
      <div class="suggestions-container">

        <div v-for="i in this.suggestions_m" :key="i" class="suggestions">
            <Suggestion class="sugg"
              @delete="this.deleteSuggestion(i._id)"
              :preloaded="true"
              :preloadedData="i"
              :settings="this.settings"
            />
        </div>
      </div>
      <div class="suggestions-container">

        <div v-for="i in this.suggestions_r" :key="i" class="suggestions">
            <Suggestion class="sugg"
              @delete="this.deleteSuggestion(i._id)"
              :preloaded="true"
              :preloadedData="i"
              :settings="this.settings"
            />
        </div>
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
import KarmaLeaderBoard from '../components/stats/KarmaLeaderBoard.vue'
import Search from '../components/Search.vue'
import { apiGetSuggestions, apiGetSuggestionsPreloaded, apiDeleteSuggestion, apiTagSuggestion } from '../api/rest/suggestions'
import { apiGetSuggestionById } from '../api/suggestion'
import { apiGetVotesByLoggedIn } from '../api/vote'
import { apiGetMovie } from '../api/movie'
import { apiGetUser } from '../api/user'
import { getMe } from '../api/user'

export default {
  name: 'Home',
  components: {
    Suggestion,
    AddMovie,
    BigHeader,
    SmallHeader,
    ProfileCard,
    NavMenu,
    KarmaLeaderBoard,
    Search,
  },
  data() {
    return {
      suggestions_l: [],
      suggestions_m: [],
      suggestions_r: [],
      all_l: [],
      all_m: [],
      all_r: [],
      loaded: false,
      loader_progress: 0,
      settings: {},
    }
  },
  methods: {
    async deleteSuggestion(id){
      await apiDeleteSuggestion(id)
      .then(()=> {
        console.log("Suggestion deleted.")      
        this.removeSuggestionFromList(id)
        })
      .catch((err)=>{
        console.log(err, err.message)
        })
    },
    removeSuggestionFromList(id){
      this.suggestions_l = this.suggestions_l.filter(x => x._id !== id)
      this.all_l = this.all_l.filter(x => x._id !== id)

      this.suggestions_m = this.suggestions_m.filter(x => x._id !== id)
      this.all_m = this.all_m.filter(x => x._id !== id)

      this.suggestions_r = this.suggestions_r.filter(x => x._id !== id)
      this.all_r = this.all_r.filter(x => x._id !== id)
    },
    async movieAdded(sid, tag){
      const newSuggestion = await apiGetSuggestionById(sid)
      if (tag._id !== 0){
        await apiTagSuggestion(tag._id, newSuggestion.data._id)
        .then((res) => { console.log(res) })
      }
      const movie = await apiGetMovie(newSuggestion.data.movie_id)
      const user = await apiGetUser(newSuggestion.data.suggested_by, true)
      var suggestion = newSuggestion.data
      suggestion.movie_id = movie.data
      suggestion.suggested_by = user

      // compatability with getSuggestions rest api
      suggestion.suggested_by.name = suggestion.suggested_by.username
      delete suggestion.suggested_by.username

      suggestion.suggested_by._id = suggestion.suggested_by.userid
      delete suggestion.suggested_by.userid

      // balance suggestion in suggestions list
      var l = this.suggestions_l <= this.suggestions_m && this.suggestions_l <= this.suggestions_r
      var m = this.suggestions_m <= this.suggestions_l && this.suggestions_m <= this.suggestions_r
      var r = this.suggestions_r <= this.suggestions_l && this.suggestions_r <= this.suggestions_m
      if (l) {
        this.suggestions_l.push(suggestion)
        this.all_l.push(suggestion)
      } else if (m) {
        this.suggestions_m.push(suggestion)
        this.all_m.push(suggestion)
      } else if (r) {
        this.suggestions_r.push(suggestion)
        this.all_r.push(suggestion)
      } else {
        this.suggestions_l.push(suggestion)
        this.all_l.push(suggestion)
      }
    },
    filterSuggestions(filter_input){
      filter_input = filter_input.toLowerCase()

      const left_filtered = this.filterArr(this.all_l, filter_input)
      const middle_filtered = this.filterArr(this.all_m, filter_input)
      const right_filtered = this.filterArr(this.all_r, filter_input)

      this.suggestions_l = left_filtered
      this.suggestions_m = middle_filtered
      this.suggestions_r = right_filtered
    },
    filterArr(arr, filter_input){
      return arr.filter(s => 
          s.suggested_by.name.toLowerCase().includes(filter_input)
          || (s.tag ? s.tag.name.toLowerCase().includes(filter_input) : false)
          || s.movie_id.title.toLowerCase().includes(filter_input)
          || s.movie_id.director.toLowerCase().includes(filter_input)
          || (filter_input[0] === '>' ? parseFloat(filter_input.substr(1)) < parseFloat(s.movie_id.imdbRating) : false)
          || (filter_input[0] === '<' ? parseFloat(filter_input.substr(1)) > parseFloat(s.movie_id.imdbRating) : false)
          || (filter_input[0] === '=' ? parseFloat(filter_input.substr(1)) === parseFloat(s.movie_id.imdbRating) : false))
    },
    searchInput(content){
      if (content !== ''){
        this.filterSuggestions(content)
      }else{
        this.suggestions_l = this.all_l
        this.suggestions_m = this.all_m
        this.suggestions_r = this.all_r
      }
    },
  },
  async mounted(){
    /*
    const allWithMovie = await apiGetSuggestions(true, true)
    const suggs = allWithMovie.data;
    */
    this.loader_progress += 5
    const suggestions = await apiGetSuggestionsPreloaded()
    this.loader_progress += 30
    const votes = await apiGetVotesByLoggedIn()
    this.loader_progress += 40
    const suggs = suggestions.data.map(s => ({...s,  vote: votes.data.filter(v => v.suggestion === s._id)[0]}))
    this.loader_progress += 20
    var side = 0;
    const me = await getMe()
    this.settings = me.settings
    console.log(me.settings);
    console.log(this.settings);
    this.loader_progress += 5
    for (var i = 0; i<suggs.length; i++){
      suggs[i].me_id = me.userid // add this here so each suggestion doesn't call getMe()
      if (side === 0){
        this.suggestions_l.push(suggs[i])
        this.all_l.push(suggs[i])
        side ++
      }
      else if (side === 1){
        this.suggestions_m.push(suggs[i])
        this.all_m.push(suggs[i])
        side ++
      }
      else if (side === 2){
        this.suggestions_r.push(suggs[i])
        this.all_r.push(suggs[i])
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
#loader-outer{
  margin-top: -100px;
  transform: rotateZ(90deg);
  border-radius: 0.25em;
  height: 150px;
  width: 5px; 
  background: rgb(238,238,238);
  transition-duration: 300ms;
}
#side-view{
  height: 95vh;
  display: flex;
  justify-content: space-between;
  align-items:flex-start;
  flex-flow: column;
  margin-top: 50px;
}
.side-section{
  display:flex; justify-content: left; align-items: flex-start; flex-flow: column;
}
#addmovie{
  margin-top: 25px; 
  width: 340px;   
  box-shadow: rgba(0, 0, 0, 0.027) 0px 12px 12.5px, rgba(0, 0, 0, 0.12) 0px -2px 6px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 2px 3px, rgba(0, 0, 0, 0.09) 0px -3px 5px; 
  padding-top: 5px;
  padding-bottom: 20px; 
  padding-right: 15px; 
  padding-left: 15px;
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
#suggestion-topbar{
  position: absolute;
  left: -45px;
  top: 35px;
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
  animation: fadeIn ease-out 0.25s;
  -webkit-animation: fadeIn ease-out 0.25s;
  -moz-animation: fadeIn ease-out 0.25s;
  -o-animation: fadeIn ease-out 0.25s;
  -ms-animation: fadeIn ease-out 0.25s;
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
  #suggestion-topbar{
    position: absolute;
    left: -45px;
    top: 40px;
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
  #suggestion-topbar{
    position: absolute;
    left: -45px;
    top: 40px;
  }
}

@media screen and (max-width: 850px){
  .side-section{
    margin-top: 75px;
    margin-bottom: 75px;
    margin-left: 40px;
    align-items: center;
    width: 85%;
  }
  #suggestions-section {
    margin-top: 350px;
  }  
  #suggestion-topbar{
    position: absolute;
    left: -45px;
    top: 330px;
  }
}

@media screen and (max-height: 800px) and (min-width: 600px) {
  .side-section{
    margin-top: 100px;
  }
  #suggestions-section {
    margin-top: 18%;
  }
  #suggestion-topbar{
    position: absolute;
    left: -50px;
    top: 170px;
  }
}

/* Mostly just for really thin screens, like Galaxy Fold */
@media screen and (max-width: 290px){
    #suggestion-topbar{
    position: absolute;
    left: 15px;
    top: 330px;
  }
  #suggestions-section {
    margin-left: 25px;
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

#logo{
  border-radius: 2em;
  border: 1px dashed rgba(255, 0, 255, 0.213);
  padding-left: 5px; padding-right: 10px;
  animation: shading linear 10s;
  animation-iteration-count: infinite;
}
@keyframes shading{
  0% {
  box-shadow:
    inset 0 0 50px rgba(255, 255, 255, 0.283),   
    inset 20px 0 80px rgba(255, 0, 255, 0.213),   
    inset -20px 0 80px rgba(0, 255, 255, 0.269), 
    inset 20px 0 200px rgba(255, 0, 255, 0.291),  
    inset -20px 0 300px rgba(0, 255, 255, 0.17),
      0 0 50px rgba(255, 255, 255, 0.3),          
      -10px 0 80px rgba(255, 0, 255, 0.265),       
      10px 0 80px rgba(0, 255, 255, 0.321);   
    }
  25% {
  box-shadow:
    inset 0 0 50px rgba(255, 255, 255, 0.402),   
    inset 20px 0 80px rgba(255, 0, 255, 0.309),   
    inset -20px 0 80px rgba(0, 255, 255, 0.399), 
    inset 20px 0 200px rgba(255, 0, 255, 0.495),  
    inset -20px 0 300px rgba(0, 255, 255, 0.374),
      0 0 50px rgba(255, 255, 255, 0.3),          
      -10px 0 80px rgba(255, 0, 255, 0.265),       
      10px 0 80px rgba(0, 255, 255, 0.321);    
  }
  75% {
  box-shadow:
    inset 0 0 50px rgba(255, 255, 255, 0.122),   
    inset 20px 0 80px rgba(255, 0, 255, 0.109),   
    inset -20px 0 80px rgba(0, 255, 255, 0.085), 
    inset 20px 0 200px rgba(255, 0, 255, 0.073),  
    inset -20px 0 300px rgba(0, 255, 255, 0.077),
      0 0 50px rgba(255, 255, 255, 0.3),          
      -10px 0 80px rgba(255, 0, 255, 0.265),       
      10px 0 80px rgba(0, 255, 255, 0.321);    
  }
  100% {
  box-shadow:
    inset 0 0 50px rgba(255, 255, 255, 0.283),   
    inset 20px 0 80px rgba(255, 0, 255, 0.213),   
    inset -20px 0 80px rgba(0, 255, 255, 0.269), 
    inset 20px 0 200px rgba(255, 0, 255, 0.291),  
    inset -20px 0 300px rgba(0, 255, 255, 0.17),
      0 0 50px rgba(255, 255, 255, 0.3),          
      -10px 0 80px rgba(255, 0, 255, 0.084),       
      10px 0 80px rgba(0, 255, 255, 0.06);    
  }
}
</style>