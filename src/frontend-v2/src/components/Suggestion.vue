<template>
    <div v-if="loaded" id="container">
        <div id="header">
            <div id="title"><p>{{this.title}}</p></div>
            <div v-if="!compact" id="rating"><p>{{this.external_rating}} <img style="width: 22px; height: 15px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png?20200406194337" alt=""></p></div>
        </div>
        <div id="body">
            <div id="information">
                <div id="info-bulletpoints">
                    <p>⌛ {{this.runtime}}</p>
                    <p>🔗 <a :href='this.source' target="_blank" style="text-decoration:underline">Source</a></p>
                    <p>🎬 {{this.director}}</p>
                </div>
                <ProfileFrame 
                    :preloaded="true"
                    :pl_profile_picture="this.suggestor_profile_picture"
                    :pl_username="this.suggestor_username"
                />
            </div>
            <div id="poster" v-if="!compact">
                <img :src="this.poster" id="poster-img" alt="">
            </div>
        </div>
        <div id="footer" v-if="!compact">
            <div v-if="rating_loaded" id="rating-stars">
            <Rating 
            @upvote="this.upvote" 
            @downvote="this.downvote" 
            @seen="this.seen" 
            :seen="this.seenValue"
            :rating="this.rating"
            /></div>
        </div>
    </div>    
</template>

<script>
import Rating from './Rating.vue'
import Button from './Button.vue'
import ProfileFrame from './profile/ProfileFrame.vue'
import { apiGetMovie } from '../api/movie'
import { apiGetUser } from '../api/user'
import { apiVoteSeen, apiVoteRating, apiGetVote } from '../api/vote'
import { apiGetSuggestionById } from '../api/suggestion'

export default {
    name: 'Suggestion',
    components: {
        Rating,
        Button,
        ProfileFrame,
    },
    data() {
        return {
            title: "Title",
            external_rating: "0.0",
            runtime: "Unknown",
            source: "Unknown",
            director: "Unknown",
            suggestor_username: "None",
            suggestor_profile_picture: "",            
            poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279",
            loaded: false,
        }   
    }, 
    props: {
        id: {
            type: String,
            default: "none"
        },
        preloaded: {
            type: Boolean,
            default: false,
        },
        preloadedData: {
            type: Object
        },
        compact: {
            type: Boolean, 
            default: false
        }
    },
    data() {
        return {
            rating_loaded: false,
            rating: 0,
            seenValue: false,
            loaded: false,
            compact_container: {
                width: '150px',
                height: '200px',    
            }
        }
    },
    methods: {
        async seen () {
            const sid = this.preloaded ? this.preloadedData._id : this.id 
            await apiVoteSeen(sid, true).then(res => {
                this.seenValue = res.data.seen
            })
        },
        async upvote() {
            const sid = this.preloaded ? this.preloadedData._id : this.id 
            await apiVoteRating(sid, 1).then(res => {
                 this.rating = res.data.rating
                 console.log(res.data)
            })
        },
        async downvote() {
            const sid = this.preloaded ? this.preloadedData._id : this.id 
            await apiVoteRating(sid, -1).then(res => {
                 this.rating = res.data.rating
            })
        },
        // fetches data from id
        async fetchDisplayData(){
            const suggestion = await apiGetSuggestionById(this.id)
            const movie = await apiGetMovie(suggestion.data.movie_id)
            const user = await apiGetUser(suggestion.data.suggested_by, true)
            this.title = movie.data.title
            this.external_rating = movie.data.imdbRating
            this.runtime = movie.data.runtime
            this.source = movie.data.source
            this.director = movie.data.director
            this.suggestor_username = user.username
            this.suggestor_profile_picture = user.profile_picture ? user.profile_picture : /* need some default image handling*/ "https://cdn.britannica.com/84/206384-050-00698723/Javan-gliding-tree-frog.jpg";
            this.poster = movie.data.poster; 
        },
        // uses preloaded data instead of fetching it
        async loadDisplayData(){
            const suggestion = this.preloadedData
            const movie = this.preloadedData.movie_id
            const user = this.preloadedData.suggested_by
            this.title = movie.title
            this.external_rating = movie.imdbRating
            this.runtime = movie.runtime
            this.source = movie.source
            this.director = movie.director
            this.suggestor_username = user.name
            this.suggestor_profile_picture = user.profile_picture ? user.profile_picture : /* need some default image handling*/ "https://cdn.britannica.com/84/206384-050-00698723/Javan-gliding-tree-frog.jpg";
            this.poster = movie.poster; 
        }
    },
    async mounted() {
        let id_for_getvote
        if (this.preloaded){
            await this.loadDisplayData();
            id_for_getvote = this.preloadedData._id
        } else {
            id_for_getvote = this.id
            await this.fetchDisplayData();
        }

        await apiGetVote(id_for_getvote)
        .then((res)=>{
                this.rating = res.data.rating; 
                this.seenValue = res.data.seen; 
                this.rating_loaded = true;
            })
        this.loaded = true
    }
}
</script>

<style scoped>
#container{
    margin: 12.5px;
    width: 310px;
    height: 310px;
    border: 0.1px solid rgba(87, 87, 87, 0.15);
    border-radius: 0.25em;
    background-color: #3A4750;
    /*
    background: rgb(55,59,64);
    background: linear-gradient(0deg, rgba(55,59,64,1) 0%, rgba(130,112,49,1) 100%, rgba(55,59,64,1) 100%); 
    */
    color: rgb(221, 217, 217);
    box-shadow: rgba(12, 11, 11, 0.4) 0px 5px 10px;

    transition-duration: 100ms;
    transition-timing-function: ease-out;

    border-bottom-right-radius: 1em;
}
#seen-container{
    border: 0.1px solid rgba(87, 87, 87, 0.15);
    border-radius: 0.25em;
    background-color: #3A4750;
    color: rgb(221, 217, 217);

    transition-duration: 100ms;
    transition-timing-function: ease-out;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
}
#container:hover{
    transition-duration: 100ms;
    transition-timing-function: ease-out;
}
#header{
    height: 55px;
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
}

#title{
    height: 70px;
    width: 75%;
    font-size: 20px;
}
#title p{
    font-weight: bolder;
    margin-left: 10%;
}
#rating{
    color: rgba(255, 217, 0, 0.863);
    height: 70px;
    font-size: 20px;
    width: 25%;
    font-style: italic;
}

#body{
    display: flex;
    flex-flow: row;
    padding-left: 13.5px;
    border-top-right-radius: 1em;
    height: 185px; 
    background: #FF9A3C;
    background: linear-gradient(0deg, #3A4750 0%, #646a70 100%, rgba(55,59,64,1) 100%); 
}
#information{
    font-size: 13.5px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: left;
    height: 100%;
    width: 175px; 
}
#information p {
    margin-left: 2%;
}
#information a{
    color: rgb(221, 217, 217);
}
#poster{
    height: 100%;
    width: 100px;
    display: flex;
    align-items: center;
}
#poster-img{
    width: 100px;
    height: 140px;
    transform: rotate3d(-90, 40, 20, 2deg);
    filter: drop-shadow(0.1rem 0.2rem 0.75rem rgb(88, 81, 76));
}

#footer{
    font-size: 14px;
    width: 100%;
    height: 110px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    transition-duration: 150ms;
}
#footer:hover{
    transition-duration: 150ms;
}
#rating-text{
    text-align: center;
    margin-bottom: 1%;
}
#rating-stars{
    margin-left: 50px;
}
</style>