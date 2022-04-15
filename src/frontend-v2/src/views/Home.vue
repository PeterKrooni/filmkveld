<template>
  <div id="home">
    <NavMenu />
    <div id="stats-section">
      <h1 id="stats-header" class="profile-header" style="font-size: 55px;">Statistics</h1>

      <h1 class="profile-header" style="color: white;font-size: 30px; margin: -50px;">Your profile</h1>
      <div class="separator">You're stuff!</div>
      
      <div id="profile-container" style="margin-top: -50px;">
        <div id="profile-info">
          <img :src="imgSource" @click="openFileSelector" id="PP" alt="">
          <input @change="updateProfilePicture" type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" style="display: none;">
          <h1 class="profile-header">{{name}}</h1>
        </div>
        <div id="profile-stats" style="text-align: left;">
          <h2 class="profile-header">Karma: <b>{{karma}}</b></h2>
          <h2 class="profile-header">Suggestions: <b>12</b></h2>
        </div>
      </div>

      <h1 class="profile-header" style="color: white;font-size: 30px; margin: -50px;">Top suggestions</h1>
      <div class="separator">Yes! I love stats! - you</div>
      
      <div id="top-suggestions-container" style="margin-top: -50px;">
        <StatsMostWanted style="margin-bottom: 30px;" />
        <StatsMostLoved style="margin-bottom: 30px;" />
      </div>
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
      <h1 id="stats-header" class="profile-header" style="font-size: 55px;">I'm stuff!</h1>

      <p>Interactions go here, stuff like 
        creating movie nights, interactible things, marking movies as seen?
      </p> 
      <button> Add movie from IMDB</button>
    </div>
  </div>
</template>

<script>
import Suggestion from '../components/Suggestion.vue'
import StatsMostWanted from '../components/stats/StatsMostWanted.vue'
import StatsMostLoved from '../components/stats/StatsMostLoved.vue'
import NavMenu from '../components/NavMenu.vue'
import { apiGetSuggestions } from '../api/rest/suggestions'
import { getMe} from '../api/user'

export default {
  name: 'Home',
  components: {
    Suggestion,
    StatsMostWanted,
    StatsMostLoved,
    NavMenu
  },
  data() {
    return {
      suggestions_l: [],
      suggestions_r: [],
      loaded: false,
      /* profile frame */
      imgSource: "https://us.123rf.com/450wm/happyvector071/happyvector0711904/happyvector071190414500/120957417-creative-illustration-of-default-avatar-profile-placeholder-isolated-on-background-art-design-grey-p.jpg?ver=6",
      name: "",
      karma: "",
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
    // load users profile
    const me = await getMe()
    this.imgSource = me.profile_picture
    this.name = me.username;

    const wts = me.wts_karma
    const seen = me.seen_karma
    this.karma = wts + seen

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
  height: 96.5vh;
}
#top-suggestions-container{
  display: flex;
  width: 100%;
  flex-flow: row;
  justify-content: space-evenly;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 12px 12.5px, rgba(0, 0, 0, 0.12) 0px -2px 6px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 2px 3px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
 
}
@media screen and (max-width: 1400px) {
  #stats-section {
    width: 28%;
    flex-flow: column;
  }
  #top-suggestions-container{
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
</style>