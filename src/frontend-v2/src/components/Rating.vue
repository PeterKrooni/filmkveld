<template>
    <div id="rating">
        <div v-if="!this.seen" @click="want_to_see(true)"><i class="fa fa-thumbs-up"></i></div>
        <div v-if="!this.seen" @click="hidden()"><i class="fa fa-thumbs-down"></i></div>
        <div v-if="this.seen" id="vote-container">
            <i :style="this.vote === 1 ? 'color: orange' : ''" @click="upvote()" class="fa fa-arrow-up"></i>
            <i :style="this.vote === -1 ? 'color: lightblue' : ''" @click="downvote()" class="fa fa-arrow-down"></i>
            <div>Seen <i :style="'color: green;'" class="fa fa-check" @click="want_to_see(false); resetVote()"></i></div>
        </div>
    </div>
</template>

<script>
import { apiVoteSeen, apiVoteRating } from '../api/vote'

export default {
    name: 'Rating',
    props: {
        seenProp: false,
        voteProp: 0,
        suggestionID: "",
    },
    data() {
        return{
            seen: false,
            vote: 0,
        }
    },
    methods:{
        async upvote() {
            await apiVoteRating(this.suggestionID, 1).then(res => {
                this.vote = 1
            })
            .catch(()=>{console.err("Upvote failed")})
        },
        async downvote() {
            await apiVoteRating(this.suggestionID, -1).then(res => {
                this.vote = -1
            })
            .catch(()=>{console.err("Upvote failed")})
        },
        async resetVote(){
            await apiVoteRating(this.suggestionID, 0).then(res => {
                this.vote = 0
            })
            .catch(()=>{console.err("Reset vote failed")})
        },
        async want_to_see(vote){
            await apiVoteSeen(this.suggestionID, vote).then((res) => {
                this.$emit("wts")
                this.seen = vote
            })
            .catch(()=>{console.err("Vote want to see failed")})
        },
        async hidden(){
            alert("Suggestion hiding is a work in progress.")
        }
    },
    mounted() {
        this.seen = this.seenProp
        this.vote = this.voteProp
    }
}
</script>

<style scoped>
#rating{
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
    align-items: center;
}
i{
    font-size: 22px;
}
i:hover{
    opacity: 0.5;
}
.fa-thumbs-up{
    color: rgba(14, 133, 14, 0.746);
}
.fa-thumbs-down{
    color: rgba(114, 17, 17, 0.889);
    margin-top: 10px;
}
#vote-container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 120px;
}
#vote-container i {
    color: rgb(138, 138, 138);
    font-size: 22px;
    font-weight: light;
    margin-left: 5px;
    margin-right: 5px;
}
#vote-container div{
    margin-left: 55px;
    font-size: 16px;
    color: white;
    font-weight: lighter;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-flow: row;
}
.fa-check {
    margin-top: 2px;
}

@keyframes fadein {
    0% {opacity: 0}
    100% {opacity: 1}
}
</style>