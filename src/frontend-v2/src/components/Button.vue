<template>
    <div id="btn-container">
        <button id="btn" @click="$emit('click')">
            {{text}}
        </button>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ""
        },
    }
}
</script>

<style scoped>
#btn{
    font-weight: lighter;
    font-size: 12px;
    padding: 7.5px;
    padding-right: 12.5px;
    padding-left: 12.5px;
    color: rgb(221, 217, 217); 
    background: rgb(42, 42, 47);
    background: linear-gradient(90deg, rgb(36, 36, 41) 0%, rgb(42, 41, 41) 50%, rgb(33, 38, 39) 100%);
    border: 1px solid rgb(90, 90, 90);
    border-radius: 0.25em;
    transition-duration: 200ms;
}
#btn:hover{
    opacity: 0.9;
    transition-duration: 115ms;
    border-bottom: 1px solid rgb(206, 205, 205);
}
</style>