<template>
    <div id="rating">
        <div v-for="i in numstars" :key="i" id="stars">
            <div v-if="i<=test_rating">
                <svg height="21" width="20">
                    <polygon points="10,1 4,19.8 19,7.8 1,7.8 16,19.8"
                    style="fill:gold;fill-rule:nonzero;" />
                </svg>
            </div>
            <div v-else>
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
        averageVote: Number,
    },
    data(){
        return {
            numstars: 10,
            test_rating: 6,
        }
    }
}
</script>

<style scoped>
#rating{
    display: flex;
    flex-flow: row;
}
</style>