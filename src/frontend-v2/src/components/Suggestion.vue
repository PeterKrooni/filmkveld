<template>
    <div v-if="loaded" id="container" >
        <button id="delete-btn" v-if="this.enable_delete" @click="this.$emit('delete')">X</button>
        <div id="header">
            <div id="title"><p>{{trimtext(this.title)}}</p></div>
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
            <div id="date-tag">
                <div v-if="this.tag != ''" id="tag-container">
                    <i @click="toggletag()" class="fa fa-tags"></i>
                    <span style="color: white;" v-if="this.showtag">{{this.tag}}</span>
                    </div>
                <div id="created-container">
                    <i @click="togglecreated()" class="fa fa-calendar"></i>
                    <span style="color: white;" v-if="this.showcreated">{{this.created}}</span>
                </div>
            </div>
            <Rating style="margin-left: -20px;"
                :suggestionID="this.preloaded ? this.preloadedData._id : this.id"
                :seenProp="this.seenValue"
                :voteProp="this.voteValue"
                @wts="this.seenValue = !this.seenValue"
            /></div>
    </div>    
</template>

<script>
import Rating from './Rating.vue'
import Button from './Button.vue'
import ProfileFrame from './profile/ProfileFrame.vue'
import { apiGetMovie } from '../api/movie'
import { apiGetUser } from '../api/user'
import { apiGetVote } from '../api/vote'
import { getMe } from '../api/user'
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
        },
    },
    data() {
        return {
            rating_loaded: false,
            voteValue: 0,
            seenValue: false,
            loaded: false,
            compact_container: {
                width: '150px',
                height: '200px',    
            },
            created: '',
            showcreated: false, 
            tag: 'Korean Movie Night',
            showtag: false,
            loaded: false,
            enable_delete: false,
        }
    },
    methods: {
        toggletag(){
            this.showtag = !this.showtag
        },
        togglecreated(){
            this.showcreated = !this.showcreated
        },
        trimtext(title){
            return title.length < 17 ? title : title.substring(0, 17) + "..." 
            // TODO rework this when not tired
            var sizeAllowance = 20
            var penalties = title.split('').filter(i => (i === i.toUpperCase() 
                    && i !== ' ' 
                    && i !== '.' 
                    && i !== ',' 
                    && i !== ':' 
                    && i !== '"') || i === '&').length
            return title.length - penalties < sizeAllowance ? title.substring(0, title.length - penalties) + "..." : title
        },
        // fetches data from id
        async fetchDisplayData(){
            const suggestion = await apiGetSuggestionById(this.id)
            const movie = await apiGetMovie(suggestion.data.movie_id)
            const user = await apiGetUser(suggestion.data.suggested_by, true)
            const me = await getMe()
            this.enable_delete = me.userid === user.data._id
            this.title = movie.data.title
            this.external_rating = movie.data.imdbRating
            this.runtime = movie.data.runtime
            this.source = movie.data.source
            this.director = movie.data.director
            this.suggestor_username = user.username
            this.suggestor_profile_picture = user.profile_picture ? user.profile_picture : /* need some default image handling*/ "https://cdn.britannica.com/84/206384-050-00698723/Javan-gliding-tree-frog.jpg";
            this.poster = movie.data.poster; 
            this.created = suggestion.data.createdAt.substring(0, 10).replace(/-/g, '/');
        },
        // uses preloaded data instead of fetching it
        async loadDisplayData(){
            const suggestion = this.preloadedData
            const movie = this.preloadedData.movie_id
            const user = this.preloadedData.suggested_by
            const me = await getMe()
            this.enable_delete = me.userid === this.preloadedData.suggested_by._id
            console.log(me.userid, "eh", this.preloadedData.suggested_by)
            this.title = movie.title
            this.external_rating = movie.imdbRating
            this.runtime = movie.runtime
            this.source = movie.source
            this.director = movie.director
            this.suggestor_username = user.name
            this.suggestor_profile_picture = user.profile_picture ? user.profile_picture : /* need some default image handling*/ "https://cdn.britannica.com/84/206384-050-00698723/Javan-gliding-tree-frog.jpg";
            this.poster = movie.poster; 
            this.created = suggestion.createdAt.substring(0, 10).replace(/-/g, '/');
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
                this.voteValue = res.data.rating; 
                this.seenValue = res.data.seen; 
                this.rating_loaded = true;
            })
        .catch(() => {
                this.voteValue = 0;
                this.seenValue = false;
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

    position: relative;

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
#delete-btn{
    font-size: 8px;
    background-color: rgba(109, 19, 19, 0.65);
    color: white;
    border: none;
    position: absolute;
    right: 0;
}
#delete-btn:hover{
    font-size: 12px;
    background-color: rgb(189, 11, 11);
    color: white;
    border: none;
    position: absolute;
    right: 0;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1) 200ms;
}
#title{
    height: 70px;
    width: 75%;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    font-size: 16px;
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: left;
    align-items: center;
    transition-duration: 150ms;
}
#footer:hover{
    transition-duration: 150ms;
}
#rating-text{
    text-align: center;
    margin-bottom: 1%;
}
#date-tag{
    color: rgb(178, 173, 173);
    width: 140px;
    font-size: 10.5px;
    margin-top: 25px;
    margin-left: 5px;
    display: flex;
    flex-flow: column;
}
#date-tag i{
    margin: 4px;
    color: rgb(189, 187, 187);
}
#tag-container{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
#tag-container i {
    margin: 2px;
}
#created-container{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
#created-container i {
    margin: 3px;
    margin-left: 4px;
    margin-right: 6px;
}
</style>