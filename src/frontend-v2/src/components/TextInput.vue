<template>
    <input type="text" :placeholder="placeholder">        
</template>

<script>
export default{
    props: {
        placeholder: {
            type: String,
            default: ""
        }
    }
}
</script>

<style scoped>
input{
    background-color: rgba(46, 41, 41, 0.048);
    padding-top: 5px;
    padding-bottom: 2px;
    padding-left: 10px;
    width: auto;
    box-shadow: 
        inset 0px -8px 8px -8px rgb(78, 76, 85); 
    border: none;
    border-bottom: 1px solid rgb(70, 70, 70);
    color: rgb(172, 172, 172);
    font-size: 14px;
}
input:focus{
    outline: none;
}
</style>