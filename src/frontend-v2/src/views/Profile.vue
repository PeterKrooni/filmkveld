<template>
    <div id="profile-container">
        <NavMenu />
        <div id="page-container">
            <div id="ns">
                <div id="profile-info">
                    <div id="profile-img">
                        <img :src="imgSource" @click="openFileSelector" id="PP" alt="">
                        <input @change="updateProfilePicture" type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" style="display: none;">
                    </div>
                    <div id="profile-details">
                        <div><p><b>Name:  </b></p> <p>{{name}}</p></div>
                        <div><p><b>Karma: </b></p> <p>{{karma}}</p></div>
                        <div><p><b>Email: </b></p> <p>{{email}}</p></div>
                    </div>
                </div>
                <div id="user-stats">
                    <div><SmallHeader :toptext="'You have '+ this.suggestionsByUser.length +  ' suggestions!'" :bottomtext="'Do you live on IMDB?'" /></div>
                    <div><SmallHeader :toptext="'Your karmascore is ' + this.karma + '!'" :bottomtext="'True popularity!'" /></div>
                </div>
            </div>
            <div id="settingsContainer">
                <div><SettingsCheckbox :settingName="'Show Tags'" /></div>
                <div><SettingsCheckbox :settingName="'Show CreatedAtDate'" /></div>
            </div>
            <div style="margin-top: 150px; margin-right: 35x; margin-bottom: -50px;"> <BigHeader :text="'Suggestions'"/> </div>
            <div id="suggestions">
                <div id="suggestions-container" v-if="loaded">
                    <div v-for="i in this.suggestionsByUser" :key="i" id="suggestions">
                        <Suggestion class="sugg"
                            :preloaded="true"
                            :preloadedData="i"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavMenu from '../components/NavMenu'
import Suggestion from '../components/Suggestion'
import SmallHeader from '../components/SmallHeader.vue'
import BigHeader from '../components/BigHeader.vue'
import SettingsCheckbox from '../components/SettingsCheckbox.vue'

import { apiGetSuggestions } from '../api/rest/suggestions'
import { getMe, apiUpdateProfilePicture } from '../api/user'

export default {
    components: {
        NavMenu,
        Suggestion,
        SmallHeader,
        BigHeader,
        SettingsCheckbox,
    },
    data() {
        return {
            imgSource: "https://us.123rf.com/450wm/happyvector071/happyvector0711904/happyvector071190414500/120957417-creative-illustration-of-default-avatar-profile-placeholder-isolated-on-background-art-design-grey-p.jpg?ver=6",
            name: "",
            email: "Not found",
            text: "Some text",
            karma: "",
            suggestionsByUser: [],
            loaded: false,
            preloaded: true, 
        }
    },
    async mounted() {
        const me = await getMe()
        this.imgSource = me.profile_picture
        this.name = me.username;
        this.karma = me.karma

        const suggestions = await apiGetSuggestions(true, true)
        this.suggestionsByUser = suggestions.data.filter(s => s.suggested_by !== me._id)
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
    width: 90%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}
#ns{
    margin-top: 50px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    width: 70vw;
    display: flex;
    flex-flow: row;
    justify-content: center;
}
#profile-info{
    width: 500px;
    display: flex;
    flex-flow: row;
}
#profile-details{
    display: flex;
    flex-flow: column;
    justify-content: center;
}
#profile-details > div {
    display: flex;
    flex-flow: row;
}
#profile-details > div > p{
    margin: 10px;
    text-align: left;
    font-size: 20px;
}
#profile-img{
    width: 50%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    border-radius: 20em;
    font-size: 12px;
}
#suggestions{
    width: 80vw;
}
#suggestions-container{
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    padding-top: 25px;
    padding-bottom: 25px;
    display: flex;
    flex-flow: row;    
    overflow-x: scroll;
    overflow-y: hidden;
    height: 30vh;
    width: 100%;
    margin-top: 35px;
}
#PP{
    border: 1px solid rgb(51, 174, 13);
    border-radius: 200em;
    height: 150px; 
    width: 150px; 
}
#PP:hover{
    transition-duration: 100ms;
    opacity: 0.5
}
#user-stats{
    height: 25%;
    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;
    margin: 20px;
    margin-top: 30px;
    padding: 20px;
}

#user-stats div{
    margin: 20px;
    width: 260px;
}

.settingsContainer {
    text-align:center;
    margin-bottom: 30px;
}

@media screen and (min-width: 1401px){
    #ns{
        justify-content: space-evenly;
    }
}
@media screen and (max-width: 1400px){ 
    #ns {
        flex-flow: column;
        width: 45vw;
    }
    #user-stats div{
    }
}
@media screen and (max-width: 1000px){ 
    #ns {
        flex-flow: column;
        width: 80vw;
    }
}
@media screen and (max-width: 650px){    
    #ns{
        width: 95vw;
    }
    #profile-info{
        flex-flow: column;
    }    
    #profile-details{
        margin-left: 100px;
    } 
    #suggestions-container{
    }
}
</style>