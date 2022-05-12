<template>
    <div id="rating">
        <div v-if="this.seen">
            {{this.rating}}
            <button @click="upvote">
                <p>Upvote</p>
            </button>
            <button @click="downvote">
                <p>downvote</p>
            </button>
        </div>
        <div v-else>
            <button @click="this.$emit('seen')">
                <p>seen</p>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Rating',
    props: {
        seen: false,
        rating: 0
    },
    data(){
        return {
            numstars: 10,
            rating: 0,
        }
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
        }
    },
    mounted(){
        this.rating = this.WTS_rated
    },
    emits: ["upvote", "downvote"]
}
</script>

<style scoped>
#rating{
    display: flex;
    flex-flow: row;
}
#stars{
    opacity: 1;
    transition-duration: 100ms;
}#stars:hover{
    opacity: 0.5;
    transition-duration: 100ms;
}
</style>