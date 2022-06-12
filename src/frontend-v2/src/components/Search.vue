<template>
    <div id="search-container">
        <img @click="toggleInput" :style="this.toggle ? '' : 'opacity: 0.5'" id="mag-glass" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/1200px-Magnifying_glass_icon.svg.png" alt="">
        <input v-if="this.toggle" placeholder="Filter suggestions" @keyup="onInput" :style="this.toggle ? 'width: 100%' : 'width: 0px;'" type="text" name="" id="search-query">
    </div>    
</template>

<script>
export default {
    data() {
        return {
            toggle: true,
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
    width: 250px;
    padding: 5px;
    border: 1px solid black;
    box-shadow: 
    rgba(0, 0, 0, 0.03133) 0px 8px 8.5px, 
    rgba(0, 0, 0, 0.0312) 0px -2px 6px, 
    rgba(0, 0, 0, 0.0312) 0px 4px 6px, 
    rgba(0, 0, 0, 0.0317) 0px 2px 3px, 
    rgba(0, 0, 0, 0.0309) 0px -3px 5px; 
}
#mag-glass{
    margin-top: 5px;
    width: 20px;
    height: 20px;
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
    font-size: 18px;
    border-bottom: 1px solid rgb(0, 0, 0);
}
#search-query:focus{
    outline: none !important;
}
</style>