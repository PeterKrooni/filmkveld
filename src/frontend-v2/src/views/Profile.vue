<template>
    <div id="profile-container">
        <NavMenu />
        <div id="page-container">
            <div id="profile-info">
                <img :src="imgSource" style="width: 100%; height: auto; border-radius: 20em;" alt="">
                <h1>Name</h1>
                <p>Some text</p>
            </div>
            <div id="user-stats">
                <div id="suggestions-container">

                </div>
                <div id="karma-container">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavMenu from '../components/NavMenu'
import { apiGetSuggestionsBy } from '../api/suggestion'
import { getMe } from '../api/user'

export default {
    components: {
        NavMenu,
    },
    data() {
        return {
            imgSource: "https://us.123rf.com/450wm/happyvector071/happyvector0711904/happyvector071190414500/120957417-creative-illustration-of-default-avatar-profile-placeholder-isolated-on-background-art-design-grey-p.jpg?ver=6",
            suggestionsByUser: []
        }
    },
    async mounted() {
        const me = await getMe()
        const suggestions = await apiGetSuggestionsBy(me.userid)
        for (var i = 0; i<suggestions.data.length; i++){
            this.suggestionsByUser.push(suggestions.data[i])
        }   
        console.log(this.suggestionsByUser)
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
    background-color: red;
    color: rgb(221, 217, 217); 
}
#page-container{
    width: 80%;
    background-color: rgb(255, 43, 43);
    display: flex;
    flex-flow: row;
}
#profile-info{
    width: 30%;
    background-color: rgb(255, 87, 87);
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}
#user-stats{
    width: 70%;
    background-color: rgb(255, 141, 141);
}
</style>