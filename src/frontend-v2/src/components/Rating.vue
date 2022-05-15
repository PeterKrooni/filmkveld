<template>
    <div id="rating">
        <i class="fa fa-thumbs-up"></i>
        <i class="fa fa-thumbs-down"></i>
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
</style>