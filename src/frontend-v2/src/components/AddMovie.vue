<template>
    <div id="add-movie-container">
        <NavMenu />
        <input id="imdb_input" type="text" placeholder="Paste IMDB link...">
        <div style="display: flex; flex-flow: row;">
            <button @click="addMovie" id="add-btn">Add movie!</button>
            <Tags style="margin-left: 10px;" />
        </div>
        <FeedbackModal @modalClosed="openModal = false" :open="openModal" :content="modalText" :type="modalType" />
    </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import FeedbackModal from '../components/FeedbackModal.vue'
import Tags from '../components/Tags.vue'
import { apiAddMovieFromOMDB } from '../api/omdb'

export default{
    components: {
        NavMenu,
        FeedbackModal,
        Tags
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
    flex-flow: column;
    justify-content: space-around;
}
#imdb_input{
    background-color: rgba(0, 0, 0, 0);
    padding: 4px;
    color: white;
    border: none;
    border-bottom: 2px solid rgb(133, 172, 218);
    font-size: 18px;
    margin-bottom: 5px;
}
#add-btn{
    background-color: rgba(137, 163, 171, 0.493);
    padding: 4px;
    color: white;
    border: none;
    border-radius: 0.25em;
    font-size: 18px;
    box-shadow:
        inset 0 0 50px rgba(255, 255, 255, 0.402),   
        inset 20px 0 80px rgba(255, 0, 255, 0.309),   
        inset -20px 0 80px rgba(0, 255, 255, 0.399), 
        inset 20px 0 200px rgba(255, 0, 255, 0.023),  
        inset -20px 0 300px rgba(0, 255, 255, 0.374),
        0 0 50px rgba(255, 255, 255, 0.3),          
        -10px 0 80px rgba(255, 0, 255, 0.265),       
        10px 0 80px rgba(0, 255, 255, 0.321);    
}
#tags-container{
    color: rgb(199, 195, 195);
}
</style>
