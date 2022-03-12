<template>
    <div id="profile-container">
        <NavMenu />
        <div id="page-container">
            <div id="profile-info">
                <img :src="imgSource" @click="openFileSelector" id="PP" alt="">
                <input @change="updateProfilePicture" type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" style="display: none;">
                <h1>{{name}}</h1>
                <p>Combined karma: {{karma}}</p>
            </div>
            <div id="user-stats">
                <div id="suggestions-container" v-if="loaded">
                    <div v-for="i in this.suggestionsByUser" :key="i" id="suggestions">
                        <Suggestion class="sugg"
                            :id="i"
                        />
                    </div>
                </div>
                <div id="karma-container">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavMenu from '../components/NavMenu'
import Suggestion from '../components/Suggestion'

import { apiGetSuggestionsBy } from '../api/suggestion'
import { getMe, apiUpdateProfilePicture } from '../api/user'

export default {
    components: {
        NavMenu,
        Suggestion,
    },
    data() {
        return {
            imgSource: "https://us.123rf.com/450wm/happyvector071/happyvector0711904/happyvector071190414500/120957417-creative-illustration-of-default-avatar-profile-placeholder-isolated-on-background-art-design-grey-p.jpg?ver=6",
            name: "",
            text: "Some text",
            karma: "",
            suggestionsByUser: [],
            loaded: false,
        }
    },
    async mounted() {
        const me = await getMe()
        this.imgSource = me.profile_picture
        this.name = me.username;

        const wts = me.wts_karma
        const seen = me.seen_karma
        this.karma = wts + seen

        const suggestion = await apiGetSuggestionsBy(me.userid)
        const suggs = suggestion.data; 
        for (var i = 0; i<suggs.length; i++){
            this.suggestionsByUser.push(suggs[i]._id)
        }
        this.loaded = true;
    },
    methods: {
        async updateProfilePicture(event) {
            if (event.target.files.length > 0){
                const b64_img = await this.readFileAsDataURL(event.target.files[0])
                const me = await getMe()
                const updated = await apiUpdateProfilePicture(me.userid, b64_img) 

                console.log(updated)
                this.imgSource = updated.profile_picture;
            }
        },
        async readFileAsDataURL(file) {
            let result_base64 = await new Promise((resolve) => {
                let fileReader = new FileReader();
                fileReader.onload = (e) => resolve(fileReader.result);
                fileReader.readAsDataURL(file);
            });
            return result_base64;
        },
        openFileSelector(){
            document.getElementById("avatar").click();
        }
    }
}
</script>

<style scoped>
#profile-container{
    width: 100%;
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    color: rgb(221, 217, 217); 
}
#page-container{
    width: 80%;
    display: flex;
    flex-flow: row;
}
#profile-info{
    width: 30%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin: 40px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    border-radius: 1em;
}
#user-stats{
    width: 70%;
}
#suggestions-container{
    display: flex;
    justify-content: space-evenly;
    flex-flow: row;    
    margin-top: 35px;
    margin-left: 70px;
}
#suggestions-container div {
    margin: 5px;
}
#PP{
    border: 1px solid rgb(59, 57, 57);
    border-radius: 20em;
    height: 100px; 
    width: 100px; 
}
#PP:hover{
    transition-duration: 100ms;
    opacity: 0.5
}
</style>