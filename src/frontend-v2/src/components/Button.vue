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
    font-size: 12px;
    padding: 7.5px;
    padding-right: 12.5px;
    padding-left: 12.5px;
    color: rgb(221, 217, 217); 
    background-color: #373b40;
    border: 0.1px solid rgba(87, 87, 87, 0.15);
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    border-radius: 0.25em;
    transition-duration: 200ms;
}
#btn:hover{
    transition-duration: 115ms;
    border-bottom: 0.1px solid rgb(206, 205, 205);
}
</style>