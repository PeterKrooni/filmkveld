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
                <div id="profile-frame">
                    <img style="width: 19px; height: 19px; border-radius: 20em;" :src="this.suggestor_profile_picture" alt=""> 
                    {{this.suggestor_username}}
                </div>
            </div>
            <div id="poster" v-if="!compact">
                <img :src="this.poster" id="poster-img" alt="">
            </div>
        </div>
        <div id="footer" v-if="!compact">
            <div id="rating-text">Want to see it?</div>
            <div v-if="rating_loaded" id="rating-stars"><Rating @rated="this.WTS_rateChange" :WTS_rated="this.WTSeen_rated" /></div>
        </div>
    </div>    
</template>

<script>
import Rating from './Rating.vue'
import Button from './Button.vue'
import { apiGetMovie } from '../api/movie'
import { apiGetUser } from '../api/user'
import { apiVoteWTS, apiGetVote } from '../api/vote'
import { apiGetSuggestionById } from '../api/suggestion'

export default {
    name: 'Suggestion',
    components: {
        Rating,
        Button,
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
        compact: {
            type: Boolean, 
            default: false
        }
    },
    data() {
        return {
            rating_loaded: false,
            WTSeen_rated: 0,
            Seen_rated: 0,
            loaded: false,
            compact_container: {
                width: '150px',
                height: '200px',    
            }
        }
    },
    methods: {
        async WTS_rateChange({rating}){
            await apiVoteWTS(this.id, rating)
        },
        async fetchDisplayData(){
            const suggestion = await apiGetSuggestionById(this.id)
            const movie = await apiGetMovie(suggestion.data.movie_id)
            const user = await apiGetUser(suggestion.data.suggested_by, true)
            console.log(movie)
            this.title = movie.data.title
            this.external_rating = movie.data.imdbRating
            this.runtime = movie.data.runtime
            this.source = movie.data.source
            this.director = movie.data.director
            this.suggestor_username = user.username
            this.suggestor_profile_picture = user.profile_picture ? user.profile_picture : /* need some default image handling*/ "https://cdn.britannica.com/84/206384-050-00698723/Javan-gliding-tree-frog.jpg";
            this.poster = movie.data.poster; 
        }
    },
    async mounted() {
        await this.fetchDisplayData();
        await apiGetVote(this.id)
        .then((res)=>{
                this.WTSeen_rated = res.data.want_to_see_rating; 
                this.Seen_rated = res.data.seen_rating; 
                this.rating_loaded = true;
            })
        .catch((res)=>{
                this.WTSeen_rated = 0; 
                this.Seen_rated = 0; 
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
#profile-frame{
    display: flex;
    flex-flow: row;
    justify-content: left;
    align-items: center;
    font-size: 14px;
    margin-left: 5px;
    margin-top: 10px;
    margin-bottom: 7px;
    padding: 6px;
    width: 65%;
    border-radius: 0.5em;
    box-shadow: rgba(23, 23, 126, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}
#profile-frame img{
    margin-right: 7px;
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