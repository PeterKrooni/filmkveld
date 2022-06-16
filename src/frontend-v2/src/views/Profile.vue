<template>
    <div id="profile-container">
        <NavMenu />
        <div id="page-container">
            <div id="ns">
                <div id="profile-info">
                    <div id="profile-img">
                        <img :src="imgSource" @click="openFileSelector" id="PP" alt="max 5mb">
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
            <div style="margin-top: 75px; margin-bottom: 50px;"> <BigHeader :text="'Settings'"/> </div>
            <div id="settingsContainer">
                <div style="display: flex; flex-flow: column; align-items: flex-end;">
                    <div style="display: flex; flex-flow: row; align-items: center; justify-content: space-evenly;">
                        <h4 style="margin-right: 15px;" :style="this.tag_setting ? 'color: white;' : 'color: grey;'"> Show tags by default: </h4> <Checkbox :defaultState="this.tag_setting" :settingName="'Show Tags'" @changeSetting='updateSetting("tag_setting")'  />
                    </div>
                    <div style="display: flex; flex-flow: row; align-items: center; justify-content: space-evenly;">
                        <h4 style="margin-right: 15px;" :style="this.date_setting ? 'color: white;' : 'color: grey;'"> Show date created by default: </h4> <Checkbox :defaultState="this.date_setting" :settingName="'Show CreatedAtDate'" @changeSetting='updateSetting("date_setting")'/>
                    </div>
                    <div style="display: flex; flex-flow: row; align-items: center; justify-content: space-evenly;">
                        <h4 style="margin-right: 15px; color: grey;"> Filter by tag when specifying tag: (WIP) </h4> <Checkbox />
                    </div>
                    <div style="display: flex; flex-flow: row; align-items: center; justify-content: space-evenly;">
                        <h4 style="margin-right: 15px; color: grey;"> Show submitter karma on suggestions: (WIP) </h4> <Checkbox />
                    </div>
                </div>
           </div>
        </div>
    </div>
</template>

<script>
import NavMenu from '../components/NavMenu'
import SmallHeader from '../components/SmallHeader.vue'
import BigHeader from '../components/BigHeader.vue'
import SettingsCheckbox from '../components/SettingsCheckbox.vue'
import Checkbox from '../components/Checkbox.vue'

import { getMe, apiUpdateProfilePicture, apiUpdateUserSettings } from '../api/user'

export default {
    components: {
        NavMenu,
        SmallHeader,
        BigHeader,
        SettingsCheckbox,
        Checkbox
    },
    data() {
        return {
            imgSource: "https://us.123rf.com/450wm/happyvector071/happyvector0711904/happyvector071190414500/120957417-creative-illustration-of-default-avatar-profile-placeholder-isolated-on-background-art-design-grey-p.jpg?ver=6",
            userid: '',
            name: "",
            email: "Not found",
            text: "Some text",
            karma: "",
            tag_setting: false,
            date_setting: false,
            suggestionsByUser: [],
            loaded: false,
            preloaded: true, 
        }
    },
    async mounted() {
        const me = await getMe()
        this.userid = me.userid
        this.imgSource = me.profile_picture
        this.name = me.username;
        this.karma = me.karma;
        this.tag_setting = me.settings.tag_setting
        this.date_setting = me.settings.date_setting;
        this.loaded = true;
    },
    methods: {
        async updateSetting(settingType) {
            switch (settingType){
                case "tag_setting":
                    this.tag_setting = !this.tag_setting
                    break;
                case "date_setting":
                    this.date_setting = !this.date_setting
                    break;
            }
            const newSettings = {
                tag_setting: this.tag_setting, 
                date_setting: this.date_setting
            }
            await apiUpdateUserSettings(this.userid, newSettings);
        },
        async updateProfilePicture(event) {
            alert("todo: remove existing images from cdn, fix that it updates, feedback if image too large")
            if (event.target.files.length > 0){
                const b64_img = await this.readFileAsDataURL(event.target.files[0])
                const me = await getMe()
                const updated = await apiUpdateProfilePicture(me.userid, b64_img) 
                .then((res) => {
                    console.log("picture updated!", res)
                    this.imgSource = res.profile_picture;
                    console.log(this.imgSource)
                })
                .catch((err) => {
                    console.log("Failed to update profile picture", err)
                })
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

#settingsContainer {
    margin: auto;;
    border-radius: 10px;
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
}
</style>