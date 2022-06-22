<template>
    <div class="profile-card-container">
        <div id="profile-container" style="margin-top: -50px;">
            <div id="profile-info">
                <img :src="disc_logo" id="disc_indicator" v-if="disc_user">
                <img :src="imgSource" id="PP" alt="">
                <input @change="updateProfilePicture" type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" style="display: none;">
                <h1 class="profile-header">{{name}}</h1>
            </div>
                <div id="profile-stats" style="text-align: left;">
                <h2 class="profile-header">Karma: <b>{{karma}}</b></h2>
                <h2 class="profile-header">Suggestions: <b>{{suggestions_count}}</b></h2>
            </div>
        </div>
    </div>
</template>

<script>

import { apiGetSuggestionsBy } from '../../api/suggestion'
import { getMe } from '../../api/user'

export default {
    data() {
        return {
            imgSource: "https://us.123rf.com/450wm/happyvector071/happyvector0711904/happyvector071190414500/120957417-creative-illustration-of-default-avatar-profile-placeholder-isolated-on-background-art-design-grey-p.jpg?ver=6",
            disc_logo: "https://res.cloudinary.com/dzp42orzn/image/upload/v1655902426/disc-logo2_vl7bqm.png",
            disc_user: false,
            name: "",
            karma: "",
            suggestions_count: 0,
            loaded: false,
        }
    },
    async mounted() {  
        // load users profile
        const me = await getMe()
        this.imgSource = me.profile_picture
        this.name = me.username;
        this.karma = me.karma
        if (me.discord_user){
            this.disc_user = me.discord_user.is_discord_user
        }
        
        const suggestions = await apiGetSuggestionsBy(me.userid)
        this.suggestions_count = suggestions.data.length

        this.loaded = true;

    }
}
</script>

<style scoped>
#profile-container{
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 135px;
  padding-top: 10px;
  padding-right: 20px;
  box-shadow: rgba(0, 0, 0, 0.133) 0px 12px 12.5px, rgba(0, 0, 0, 0.12) 0px -2px 6px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 2px 3px, rgba(0, 0, 0, 0.09) 0px -3px 5px; 
}
#profile-conatiner:hover{
    width: 400px;
    box-shadow: 0px 12px 30px 4px rgb(255, 255, 255);
}
#profile-info{
  position: relative;
  width: 200px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  border-radius: 1em;
  font-size: 10px;
}
.profile-header{
  font-weight: lighter;font-size: 18px;color: #969ca3; letter-spacing: 1px;
}
#PP{
    border: 1px solid rgb(59, 57, 57);
    border-radius: 20em;
    height: 85px; 
    width: 85px; 
}
#disc_indicator{
    position: absolute;
    top: 0;
    opacity: 0.5;
    left: 45px;
    width: 18px;
    height: 18px;
}
</style>