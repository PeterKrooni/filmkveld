<template>
    <div id="rating">
        <div v-for="i in numstars" :key="i" id="stars">
            <div v-if="i<=rating" @click="vote(i)">
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
</template>

<script>
export default {
    name: 'Rating',
    props: {
        WTS_rated: 0
    },
    data(){
        return {
            numstars: 10,
            rating: 0,
        }
    },
    methods:{
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
    }
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