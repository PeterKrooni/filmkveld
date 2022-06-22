<template>
    <div id="rating">
        <div id="vote-container">
            <div id="rate-container">
                <div style="width: 50px; margin-bottom: 10px; font-size: 14px;">Rate it!</div>
                <div id="up-down-container">
                    <i :style="this.vote === 1 ? 'color: orange' : ''" @click="upvote()" class="fa fa-arrow-up"></i>
                    <i :style="this.vote === -1 ? 'color: lightblue' : ''" @click="downvote()" class="fa fa-arrow-down"></i>
                </div>
            </div>

            <div class="seen-container" v-if="this.seen">Seen: {{numSeen}}
                <i :style="'color: green; margin-top: 3px; font-size: 15px;'" class="fa fa-check" @click="this.voteSeen(false); resetVote()"></i>
            </div>
            <div class="seen-container" v-else>Seen: {{numSeen}}
                <i :style="'color: rgb(171, 136, 136); margin-top: 3.5px; font-weight: light; font-size: 15px;'" class="fa fa-times" @click="this.voteSeen(true); resetVote()"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { apiVoteSeen, apiVoteRating } from '../api/vote'

export default {
    name: 'Rating',
    props: {
        seenProp: { num: 0, seen: false },
        voteProp: 0,
        suggestionID: "",
    },
    data() {
        return{
            seen: false,
            numSeen: 0,
            vote: 0,
        }
    },
    methods:{
        async upvote() {
            if (!this.seen){
                await this.voteSeen(true)
            }
            await apiVoteRating(this.suggestionID, this.voteHandler(1)).then(res => {
                this.vote = 1
            })
            .catch(()=>{console.error("Upvote failed")})
        },
        async downvote() {
            if (!this.seen){
                await this.voteSeen(true)
            }
            const newRating = this.voteHandler(-1)
            await apiVoteRating(this.suggestionID, this.voteHandler(-1)).then(res => {
                this.vote = -1
            })
            .catch(()=>{console.error("Downvote failed")})
        },
        async resetVote(){
            if (this.seen){
                await this.voteSeen(false)
            }
            await apiVoteRating(this.suggestionID, this.voteHandler(0)).then(res => {
                this.vote = 0
            })
            .catch(()=>{console.error("Reset vote failed")})
        },
        voteHandler(newVote) { //handle edgecases
            if (newVote === 0) { //remove vote
                if (this.vote === 1) {return 0}
                if (this.vote === -1) {return 0}
                if (this.vote === 0) {return 0}
                return newVote
            }
            else if (newVote === 1) { //upvote
                if (this.vote === 1) {return 0}
                if (this.vote === -1) {return 1}
                if (this.vote === 0) {return 1}
                return newVote
            }
            else if (newVote === -1) { //downvote
                if (this.vote === 1) {  return -1}
                if (this.vote === -1) {return 0}
                if (this.vote === 0) {return -1}
                return newVote
            }
        },
        async voteSeen(vote){
            await apiVoteSeen(this.suggestionID, vote).then((res) => {
                this.$emit("wts")
                this.seen = vote
            })
            .catch(()=>{console.error("Vote want to see failed")})
        },
        async hidden(){
            alert("Suggestion hiding is a work in progress.")
        }
    },
    mounted() {
        this.seen = this.seenProp.seen
        this.numSeen = this.seenProp.num
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
    color: rgba(127, 79, 79, 0.889);
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
#vote-container {
    font-size: 16px;
    color: white;
    font-weight: lighter;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-flow: row;
}
#rate-container{
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
}
#up-down-container{
    display: flex;
    flex-flow: row;
}
#up-down-container i {
    margin-left: -2px;
}
.seen-container{
    margin-left: 60px;
    margin-top: 37.5px;
    display: flex; 
    flex-flow: row;
    font-size: 14px;
    color: rgb(176, 170, 170);
    font-style: normal;
}
.fa-check {
    width: 20px;
    margin-top: 2px;
}
.fa-times {
    width: 20px;
    margin-top: 2px;
}

@keyframes fadein {
    0% {opacity: 0}
    100% {opacity: 1}
}
</style>