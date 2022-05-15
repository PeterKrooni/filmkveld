<template>
    <div id="rating">
        <div id="vote-container">
            <i :style="this.vote === 1 ? 'color: orange' : ''" @click="upvote()" class="fa fa-arrow-up"></i>
            <i :style="this.vote === -1 ? 'color: lightblue' : ''" @click="downvote()" class="fa fa-arrow-down"></i>
            <div v-if="this.seen">Seen 
                <i :style="'color: green;'" class="fa fa-check" @click="this.voteSeen(false); resetVote()"></i>
            </div>
            <div v-else>Seen 
                <i :style="'color: darkred; font-weight: light;'" class="fa fa-times" @click="this.voteSeen(true); resetVote()"></i>
            </div>
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
            if (!this.seen){
                await this.voteSeen(true)
            }
            await apiVoteRating(this.suggestionID, 1).then(res => {
                this.vote = 1
            })
            .catch(()=>{console.err("Upvote failed")})
        },
        async downvote() {
            if (!this.seen){
                await this.voteSeen(true)
            }
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
        async voteSeen(vote){
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