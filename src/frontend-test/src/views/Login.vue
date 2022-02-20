<template>
    <div id="login">
        <div id="form-container" class="main-containers">
            <div id="form">
                <div v-if="!loggedIn">
                <input v-model="email" type="text" name="email" class='default-input' placeholder="Email">
                <input v-model="pass" type="password" name="password" class='default-input' placeholder="Password" id="pass">
                <input type="submit" @click="login()" class="default-button" value="Log in">
                </div>
                <div v-if="loggedIn" style="margin-top: 50px;">Logged in
                    <button @click="logOut()" class="default-button">Log out</button>
                 </div>    
                 <button @click="sendRequest()" class="default-button">Send test request</button>

                <Alert 
                    :show="showMessage" @close="showMessage = false"
                    :header="'Message'"
                    :body="`Logged in as ${this.email}`"
                    :footer="'Success'"
                    :confirmation="'Ok'">
                </Alert>
            </div>
        </div>
        <div v-if="loggedIn" id="suggestion-container" class="main-containers">
            <h3>Suggestions</h3>
            <button @click="getSuggestions()">Get Suggestions</button>
            <div v-for="(suggestion, index) of suggestions.data" :key="suggestion" id="suggestions-container">
                <table style="text-align: left; margin:10px; border: 2px solid black;">
                    <th>Suggestion nr. {{index}}</th>
                    <tr>Suggestion id: {{suggestion._id}}</tr>
                    <tr>Suggested by: {{suggestion.suggested_by}}</tr>
                    <tr>Movie ID: {{suggestion.movie_id}}</tr>
                </table>
            </div>
            <div id="suggestion-form" style="display: flex; flex-flow: column">
                <input v-model="sugg_movieID" type="text" placeholder="movieID">
                <button @click="addSuggestion()" style="margin-bottom: 25px;">Add</button>
                <input v-model="sugg_suggID" type="text" placeholder="suggestionID">
                <button @click="removeSuggestion()">Remove</button>
            </div>
        </div>
        <div v-if="loggedIn" id="votes-container" class="main-containers">
            <h3>My votes</h3>
            <button @click="getMyVotes()">Get My Votes</button>
            <div v-for="(vote, index) of myVotes" :key="vote">
                <table style="text-align: left; margin:10px; border: 2px solid black;">
                    
                    <th>Vote nr. {{index}}</th>
                    <tr>Vote id: {{vote._id}}</tr>
                    <tr>Voted by: {{vote.voted_by}}</tr>
                    <tr>Suggestion ID: {{vote.suggestion}}</tr>
                    <tr>Want to see rating: {{vote.want_to_see_rating}}</tr>
                    <tr>Seen rating: {{vote.seen_rating}}</tr>
                </table>
            </div>

            <div id="suggestion-form" style="display: flex; flex-flow: column">
                <input v-model="vote_suggID" type="text" placeholder="suggestionID" style="margin-top: 25px;">
                <input v-model="vote_amnt" type="text" placeholder="Want to see 1-10">
                <button @click="addVote()" >Add</button>    
                <button @click="updateVote()" >Update</button>    
                <button @click="removeVote()" >Remove</button>    
           </div>
        </div>
        <div v-if="loggedIn" id="movie-container" class="main-containers">
            <h1>Movies</h1>
            <button @click="getMovies()">Get Movies</button>
            <div v-for="(movie, index) of movies.data" :key="movie">
                <table style="text-align: left; margin:10px; border: 2px solid black;">
                    <th>Movie nr. {{index}}</th>
                    <tr>Object id: {{movie._id}}</tr>
                    <tr>Title: {{movie.title}}</tr>
                    <tr>Runtime: {{movie.runtime}}</tr>
                    <tr>External rating: {{movie.rating}}</tr>
                    <tr>Object version: {{movie.__v}}</tr>
                </table>
            </div>
        </div>
    </div>
    <!--<Teleport />-->
</template>

<script>
import { apiLogin }  from '../api/login.js'
import { apiGetMovies }  from '../api/movie.js'
import { apiGetAllSuggestions,
         apiAddSuggestion,
         apiRemoveSuggestion }  from '../api/suggestion.js'
import { apiGetVotesByLoggedIn,
         apiAddVote,
         apiRemoveVote,
         apiUpdateVote } from '../api/vote.js'
import { logout } from '../helpers/logout.js'
import axios from 'axios'
import Alert from '../components/modals/Alert.vue'
export default{
    name: 'Login',  
    components: {
        Alert
    },  
    data() {
        return {
            email: "tob@email.com",
            pass: "tob",
            loggedIn: false,
            showMessage: false,
            movies: [],
            suggestions: [],
            sugg_movieID: "",
            sugg_suggID: "",
            myVotes: [],
            vote_suggID: "",
            vote_amnt: "",
        }
    }, 
    methods:{
        login: async function(){
            this.loggedIn = await apiLogin(this.email, this.pass)
            if (this.loggedIn){
                this.showMessage = true; 
            }
        },
        logOut: async function(){
            await logout();
            this.loggedIn = false;
        },
        sendRequest: async function(){
            axios.get('http://localhost:5000/api/v1/user/me')
                .then((response)=>{console.log(response)})
        },
        getMovies: async function(){
            this.movies = await apiGetMovies()
            console.table(this.movies)
        },
        getSuggestions: async function(){
            this.suggestions = await apiGetAllSuggestions()
            console.table(this.suggestions)
        },
        addSuggestion: async function(){
            await apiAddSuggestion(this.sugg_movieID)
                .then(()=>{this.getSuggestions()})
        },
        removeSuggestion: async function(){
            await apiRemoveSuggestion(this.sugg_suggID)
                .then(()=>{this.getSuggestions()})
        },
        getMyVotes: async function(){
            var newVotes = []
            const votes = await apiGetVotesByLoggedIn(this.vote_suggID)
                .then((res) => {
                    console.log(res)
                    for (var i = 0; i<res.length; i++){
                        if (res[i].data != null){
                            newVotes.push(res[i].data)
                        }
                    }
                })
            this.myVotes = newVotes
        },
        addVote: async function(){
            await apiAddVote(this.vote_suggID, this.vote_amnt)
                .then(()=>{this.getMyVotes()})
        },
        updateVote: async function(){
            await apiUpdateVote(this.vote_suggID, this.vote_amnt)
                .then(()=>{this.getMyVotes()})
        },
        removeVote: async function(){
            await apiRemoveVote(this.vote_suggID)
                .then(()=>{this.getMyVotes()})
        }
    },
    mounted(){
        if (this.loggedIn){
            this.getMovies()
            this.getSuggestions()
            this.getMyVotes()
        }
    }
}
</script>

<style scoped>
#login{
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.main-containers{
    margin: 50px;
}
.default-input{
    margin: 10px;
    font-size: 20px;
    border: none;
    border-bottom: 1px solid black;
}
.default-input:focus{
    outline: none;
}

#form-container{
    width: 400px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

#form{
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
}

.default-button{
    margin-top: 25px;
    font-size: 16px;
    border-radius: 0.4em;
    border: 1px solid grey;
    background-color: white;
    width: 100%;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
}
</style>