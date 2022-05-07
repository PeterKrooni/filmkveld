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
            await apiAddMovieFromOMDB(imdb_link)
            .then((res) => {
                this.modalText= res.data.movie.title + " added."
                this.modalType="Confirmation"
                this.openModal = true
             })
            .catch((res) => {
                console.log(res.response)
                this.modalText = res.response.data.response
                this.modalType = "Error"
                this.openModal = true
            })
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
