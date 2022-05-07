<template>
    <div id="add-movie-container">
        <NavMenu />
        <input id="imdb_input" type="text" placeholder="Paste IMDB link...">
        <button @click="addMovie" id="add-btn">Add movie!</button>
        <FeedbackModal @modalClosed="openModal = false" :open="openModal" :content="modalText" :type="modalType" />
    </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import FeedbackModal from '../components/FeedbackModal.vue'
import { apiAddMovieFromOMDB } from '../api/omdb'

export default{
    components: {
        NavMenu,
        FeedbackModal
    },
    data() {
        return{
            openModal: false,
            modalText: '',
            modalType: 'Confirmation'
        }
    },
    methods: {
        async addMovie(){
            var imdb_link = document.getElementById("imdb_input").value
            console.log(imdb_link)  
            if (imdb_link === ""){
                this.modalText = "IMDB link cannot be empty."
                this.modalType = "Warning"
                this.openModal = true
                return
            }
            if (!imdb_link.startsWith("https://www.imdb.com/")){
                this.modalText = "Invalid link or not an IMDB link: " + imdb_link
                this.modalType = "Error"
                this.openModal = true
                return
            }
            const result = await apiAddMovieFromOMDB(imdb_link)
            if (result){
                console.log(result)
                this.modalText="Movie " + result.data.movie.title + " added."
                this.modalType="Confirmation"
            }else{
                this.modalText = "Failed to add movie with link " + imdb_link
                this.modalType = "Error"
            }
            this.openModal = true
            return
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
