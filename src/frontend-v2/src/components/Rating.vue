<template>
    <div id="rating">
        <div v-if="!this.seen" @click="upvote"><i class="fa fa-thumbs-up"></i></div>
        <div v-if="!this.seen" @click="downvote"><i class="fa fa-thumbs-down"></i></div>
        <div v-if="this.seen" id="stars-container">
            <div v-for="i in 5" :key="i" id="stars">
                <div v-if="i <= this.star" @click="vote(i)">
                    <svg height="21" width="20">
                        <polygon points="10,1 4,19.8 19,7.8 1,7.8 16,19.8"
                        style="fill:gold;fill-rule:nonzero;" />
                    </svg>
                </div>
                <div v-else @click="vote(i)">
                    <svg height="21" width="20">
                        <polygon points="10,1 4,19.8 19,7.8 1,7.8 16,19.8"
                        style="fill:grey;fill-rule:nonzero;" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Rating',
    props: {
        seen: false,
        star: 0,
    },
    methods:{
        upvote: function() {
            this.$emit("upvote")
        },
        downvote: function() {
            this.$emit("downvote")
        },
        vote: function(i){
            if (i==1 && this.rating == 1){
                this.rating = 0;
            } else {
                this.rating = i;
            }
            this.$emit("rated", {rating: this.rating});
            this.star = this.rating
        }
    },
    emits: ["upvote", "downvote", "rated"]
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
    font-size: 25px;
}
i:hover{
    opacity: 0.5;
}
.fa-thumbs-up{
    color: rgba(26, 146, 26, 0.744);
}
.fa-thumbs-down{
    color: rgb(137, 29, 29);
    margin-top: 10px;
}
#stars{
    opacity: 1;
    transition-duration: 100ms;
}#stars:hover{
    opacity: 0.5;
    transition-duration: 100ms;
}
#stars-container{
    display: flex;
    justify-content: space-evenly;
}
</style>