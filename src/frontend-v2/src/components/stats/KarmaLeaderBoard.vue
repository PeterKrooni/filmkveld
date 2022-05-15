<template>
<div id="karma-stats-container">
    <SmallHeader :toptext="'Top users'" :bottomtext="'GOATs!'"/>
    <div v-if="loaded" id="karma-list-container">
        <div v-for="(item) in users" :key="item" class="user-stat">
            <div class="karma-bar" :style="'height: ' + item.karma + 'px;'"></div>
            <div :style="'color: yellow;'">{{item.karma}}</div>
            <div :style="'color: white; font-size: 12px;'">{{item.name}}</div>
            <div><img :src="item.profile_picture" style="border: 2px solid rgb(120, 120, 125); width: 30px; height: 30px; border-radius: 20em;" alt=""></div>
        </div>
    </div>
</div>   
</template>

<script>
import { apiGetTopKarmaUsers } from '../../api/user'
import ProfileFrame from '../profile/ProfileFrame.vue'
import SmallHeader from '../SmallHeader.vue'

export default {
    components: {
        ProfileFrame,
        SmallHeader,
    },
    data() {
        return{
            users: [],
            loaded: false,
            userlimit: 5,
            colors: [],
        }
    },
    async mounted(){
        for (var i = 0; i<this.userlimit; i++){
            this.colors.push("#" + Math.floor(Math.random()*16777215).toString(16))
        }
        console.log(this.colors)
        const topUsers = await apiGetTopKarmaUsers(this.userlimit)
        .then((res) => { this.users = res.data; this.loaded = true; })
        .catch(() => {console.error("Could not get top users.")})
    }
}
</script>

<style scoped>
#karma-stats-container{
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: flex-start;
}
#karma-list-container{
    margin-top: 25px;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: baseline;
}
.user-stat{
    margin: auto;
    display: flex;
    flex-flow: column;
    text-align: center;
    justify-content: center;
    margin: 5px;
    transition-duration: 200ms;
}
.karma-bar{
    width: 20px; 
    margin: auto; 
    background-color: rgb(177, 152, 201); 
    border-top-left-radius: 0.2em; 
    border-top-right-radius: 0.2em;
}
</style>