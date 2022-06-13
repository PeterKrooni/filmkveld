<template>
    <div id="search-container" :style="this.toggle ? 'width: 250px;' : 'width: 26px;'">
        <img @click="toggleInput" id="mag-glass" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/1200px-Magnifying_glass_icon.svg.png" alt="">
        <input v-if="this.toggle" placeholder="Filter suggestions" @keyup="onInput" :style="this.toggle ? 'width: 100%' : 'width: 0px;'" type="text" name="" id="search-query">
    </div>    
</template>

<script>
export default {
    data() {
        return {
            toggle: false,
        }
    },
    methods: {
        toggleInput() {
            this.toggle = !this.toggle
        },
        onInput(){
            this.$emit('onInput', document.getElementById('search-query').value)
        }
    }
}
</script>

<style scoped>
#search-container{
    display: flex;
    justify-content: left;
    align-items: center;
    border: 1px solid #1d1f21; 
    border-radius: 1em;
    padding: 2px;
    background-color: #505367;
    box-shadow: 
    rgba(0, 0, 0, 0.03133) 0px 8px 8.5px, 
    rgba(0, 0, 0, 0.0312) 0px -2px 6px, 
    rgba(0, 0, 0, 0.0312) 0px 4px 6px, 
    rgba(0, 0, 0, 0.0317) 0px 2px 3px, 
    rgba(0, 0, 0, 0.0309) 0px -3px 5px; 
}
#mag-glass{
    width: 15px;
    height: 13px;
    padding: 6px;
    border-radius: 2em;
    transition-duration: 150ms;
}
#search-query {
    color: rgb(196, 200, 201);
    margin-left: 4px;
    margin-right: 4px;
    background: none;
    border: none;
    font-size: 14px;
}
#search-query:focus{
    outline: none !important;
}
</style>