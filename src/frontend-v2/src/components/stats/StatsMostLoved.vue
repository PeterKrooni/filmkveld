<template>
    <div id="most-loved" v-if="loaded">
        <h2>Most loved</h2>
        <SuggestionHighlight 
            :suggestion_id="id"
        />
    </div>
</template>

<script>
import SuggestionHighlight from './SuggestionHighlight.vue'
import { apiGetMostWanted } from '../../api/rest/suggestions'

export default {
    components: {
        SuggestionHighlight
    }
    ,
    data(){
        return {
            id: Object,
            loaded: false,
        }
    },
    async mounted(){
        const sugg = await apiGetMostWanted()
        this.id = sugg.data._id
        this.loaded = true
    }
}
</script>

<style scoped>
#most-loved{
    padding: 10px;
    border-radius: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
}
#most-loved h2{
    font-weight: lighter;
    font-size: 22px;
    color: #848b93;
}
</style>
