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


                        <div><p><b>Name:</b></p></div>
                        <span style="margin-left: 11px; margin-bottom: 15px;">
                            <input id="tag-input" v-model="name" :style="this.toggle  ? 'opacity: 0.5' : ''" :disabled="this.toggle" @keyup="keyEntered">
                            <i v-if="this.toggle" class="fa fa-pencil" style="margin-left: 12px;"  @click="this.toggleInput()"></i>
                            <i v-if="!this.toggle" class="fa fa-times" style="margin-left: 12px;"  @click="this.toggleInput()"></i>
                       </span>
                       
                        <div><p><b>Karma: </b></p> <p>{{karma}}</p></div>
                        
                        <div v-if="!disc_user"><p><b>Email: </b></p> <p>{{email}}</p></div>
                        <div id="disc_indicator" v-else><img :src="disc_logo"><button id="refresh-disc-btn" @click="refresh_discord_profile">Refresh profile</button></div>

                    </div>
                </div>
                <div id="user-stats">
                    <div><SmallHeader :toptext="'You have '+ 8 +  ' suggestions!'" :bottomtext="'Do you live on IMDB?'" /></div>
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

import { getMe, apiUpdateProfilePicture, apiUpdateUserSettings, apiSynchronizeUserWithDiscord, apiUpdateUsername } from '../api/user'
import { getOAUTH } from '../helpers/auth'
import { getDiscordInformation } from '../helpers/discordmapper'

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
            disc_logo: "https://res.cloudinary.com/dzp42orzn/image/upload/v1655902426/disc-logo2_vl7bqm.png",
            disc_user: false,
            disc_id: '',
            toggle: true
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
        if (me.discord_user){
            this.disc_user = me.discord_user.is_discord_user
            this.disc_id = me.discord_user.discord_id
        }
        this.loaded = true;
    },
    methods: {
        toggleInput(){
            this.toggle = !this.toggle
        },
        async keyEntered(val){
            if (val.key === 'Enter'){
                if (this.name.length > 15 || this.name.length < 1){
                    alert("Wrong username length, required: 1-15, provided: ${this.name.length}")
                    return
                }
                await apiUpdateUsername(this.userid, this.name)
                .then(() => {
                    console.log(`Username updated: ${this.name}`)
                    this.toggle = true
                })
                .catch((err) => {
                    console.error(`Error updating username: ${err}`)
                })
            }
        },
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
            // todo: remove existing images from cdn, fix that it updates, feedback if image too large")
            if (event.target.files.length > 0){
                const b64_img = await this.readFileAsDataURL(event.target.files[0])
                const me = await getMe()
                const updated = await apiUpdateProfilePicture(me.userid, b64_img) 
                .then((res) => {
                    this.imgSource = res.profile_picture;
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
        },
        async refresh_discord_profile(){
            if (!this.disc_user){
                alert("You are not a Discord user. How did you manage to click this button? 🤔")
                return
            }
            if (confirm("Refresh Discord data? This will undo any changes to your name or profile picture on this website.")){
               await getDiscordInformation(getOAUTH())
                .then((res) => {
                    const oldUser = {
                        userid: this.userid,
                        is_discord_user: this.disc_user,
                        discord_id: this.disc_id
                    }
                    const newUser = {
                        is_discord_user: true,
                        discord_id: this.disc_id,
                        profile_picture: res.data.avatar,
                        username: res.data.username
                    }
                    apiSynchronizeUserWithDiscord(oldUser, newUser)
                    .then((res) => {
                        this.imgSource = res.data.profile_picture
                        this.name = res.data.name
                    })
                })
                
            }
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
    position: relative;
    width: 90%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}
#tag-input{
    color: white; font-size: 14px; font-weight: bold; border: 1px solid white; padding: 5px; border-radius: 0.5em;
    background-color: rgb(63, 69, 83);
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
#disc_indicator {
    margin-top: 10px;
    margin-left: 5px;
}
#disc_indicator img{
    margin-left: 6px;
    margin-right: 15px;
    opacity: 1;
    left: -25px;
    width: 22px;
    height: 22px;
}
#refresh-disc-btn {
    border: none;
    border-radius: 0.5em;
    color: rgb(238, 238, 238);
    padding: 5px;
    background: rgb(155, 153, 153);
    background: linear-gradient(0deg, rgb(132, 129, 129) 0%, rgba(58,71,80,1) 0%, rgba(38,40,42,0.8659664549413515) 49%, rgba(128,137,147,0.8659664549413515) 99%);
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