<template>
    <div id="add-movie-container">
        <NavMenu />
        <input id="imdb_input" type="text" placeholder="Paste IMDB link...">
        <button @click="addMovie" id="add-btn">Add movie!</button>
    </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import { apiAddMovieFromOMDB } from '../api/omdb'

export default{
    components: {
        NavMenu
    },
    methods: {
        async addMovie(){
            var imdb_link = document.getElementById("imdb_input").value
            if (!imdb_link.startsWith("https://www.imdb.com/")){
                console.error("Invalid link or not an IMDB link: ", imdb_link)
                return
            }
            if (imdb_link === ""){
                console.error("IMDB link cannot be empty.")
                return 
            }
            await apiAddMovieFromOMDB(imdb_link)
        }
    }
}
</script>

<style scoped>
#add-movie-container{
    display: flex;
    justify-content: space-around;
}
#imdb_input{
    background-color: rgba(0, 0, 0, 0);
    padding: 4px;
    color: white;
    border: none;
    border-bottom: 1px solid black;
    font-size: 18px;
}
#add-btn{
    background-color: rgba(137, 163, 171, 0.493);
    padding: 4px;
    color: white;
    border: none;
    border-radius: 0.25em;
    font-size: 16px;
}
</style>
