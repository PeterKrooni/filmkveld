<template>
    <div id="movies-container">
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
#movies-container{
    height: 50vh;
    overflow: hidden;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}
#imdb_input{
    width: 400px;
    height: 30px;
    font-size: 20px;
}
#add-btn{
    margin: 20px;
    padding: 10px;
    font-size: 14px;
}
</style>
