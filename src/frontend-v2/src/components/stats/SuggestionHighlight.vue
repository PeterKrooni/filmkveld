<template>
    <!-- 
        Compact, highlighted suggestion
        made for displaying highest voted etc. suggestions
    -->
    <div class="suggestion-highlight" v-if="loaded">
        <div id="background">
            <img :src="poster" alt="">
        </div>
        <div id="content">
            <div id="title">{{this.title}}</div>
            <div id="ratings">
                <h1>⭐12
                </h1>
            </div>
            <div id="suggested-by">
                Suggested by
                <ProfileFrame 
                    :preloaded="true"
                    :pl_username="this.suggestor_username"
                    :pl_profile_picture="this.suggestor_profile_picture"
                /> 
            </div>
        </div>
    </div> 
</template>

 <script>
import { apiGetSuggestionById } from '../../api/suggestion'
import { apiGetMovie } from '../../api/movie'
import { apiGetUser } from '../../api/user'
import ProfileFrame from '../profile/ProfileFrame.vue'

export default {
    components: {
        ProfileFrame
    },
        props: {
        suggestion_id: "",
    },
    data () {
        return {
            loaded: false,
            title: "",
            suggestor_username: "",
            suggestor_profile_picture: "",
            poster: "",
        }
    },
    methods: {
        async fetchDisplayData(){
            const suggestion = await apiGetSuggestionById(this.suggestion_id)
            const movie = await apiGetMovie(suggestion.data.movie_id)
            const user = await apiGetUser(suggestion.data.suggested_by, true)
            
            this.title = movie.data.title
            this.suggestor_username = user.username
            this.suggestor_profile_picture = user.profile_picture ? user.profile_picture : /* need some default image handling*/ "https://cdn.britannica.com/84/206384-050-00698723/Javan-gliding-tree-frog.jpg";
            this.poster = movie.data.poster; 
        }
    },
    async mounted() {
        await this.fetchDisplayData();
        this.loaded = true
    }
}
 </script>
<style scoped> 
.suggestion-highlight{    
    border-radius: 0.5em;
    width: 150px;
    height: 220px;
}
#background{
    position: fixed;
    z-index: -1;
}
#background > img{
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    width: 150px;
    height: auto;
    filter: blur(2px) brightness(40%);
}
@media screen and (max-width: 1000px) {
  #background > img{
      display: none;
  }
}
#title{
    margin-top: 10px;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    padding-bottom: 4px;
    color: rgb(221, 217, 217);
    font-size: 18px;
    font-weight: bolder;
    text-align: center;
}
#ratings{
    display: flex;
    justify-content: center;
    align-items: center;
}
#ratings > h1 {
    font-weight: lighter;
}
#suggested-by{
    color: rgb(221, 217, 217);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
}
</style>