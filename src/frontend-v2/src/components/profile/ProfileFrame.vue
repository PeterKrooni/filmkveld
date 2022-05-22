<template>
    <div id="profile-frame" v-if="loaded">
        <img style="width: 19px; height: 19px; border-radius: 20em;" :src="this.profile_picture" alt=""> 
        {{this.username}}
    </div>    
</template>

<script>
import { apiGetUser } from '../../api/user'

export default {
    data() {
        return {
            loaded: false,
            username: "",
            profile_picture: "",
        }
    },
    props: {
        preloaded: false,
        userid: "",
        pl_username: "",
        pl_profile_picture: "",
    },
    async mounted() {
        if (this.preloaded){
            this.username = this.pl_username
            this.profile_picture = this.pl_profile_picture
        } else {
            const user = await apiGetUser(this.userid, true)
            this.username = user.username
            this.profile_picture = user.profile_picture ? user.profile_picture : /* need some default image handling*/ "https://cdn.britannica.com/84/206384-050-00698723/Javan-gliding-tree-frog.jpg";
            
        }
        this.loaded = true
    }
}
</script>

<style scoped>
#profile-frame{
    display: flex;
    flex-flow: row;
    justify-content: left;
    align-items: center;
    font-size: 14px;
    margin-left: 5px;
    margin-top: 10px;
    margin-bottom: 7px;
    padding: 6px;
    width: 65%;
    border-radius: 0.5em;
    box-shadow: rgba(23, 23, 126, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}
#profile-frame:hover{
    cursor: pointer;
}
#profile-frame img{
    margin-right: 7px;
}
</style>
