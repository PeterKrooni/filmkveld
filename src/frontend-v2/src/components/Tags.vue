<template>
<div id="tags-container">
    <div id="icons">
        <i class="fa fa-tags" style="margin-top: 5px;"></i>
        <i class="fa fa-pencil" style="margin-top: 12px;"  @click="this.toggleInput()"></i>
    </div>
    <div>
        <input id="input_tag" v-if="this.toggle" :value="this.tag_input" type="text">
        <div id="tag-display">
            <div style="font-size: 14px; margin-bottom: 5px;">Current Tag </div>
            <div style="color: white; font-weight: bold; border: 1px solid white; padding: 5px; border-radius: 0.5em;">{{this.current_tag}}</div>
        </div>
    </div>
</div>    
</template>

<script>
export default {
    data(){
        return {
            tag_input: '',
            current_tag: 'None',
            toggle: false,
            tags: [],
        }
    },
    methods: {
        toggleInput(){
            if (this.toggle){
                this.current_tag = document.getElementById("input_tag").value
                if (this.current_tag === ''){
                    this.current_tag = 'None'
                }
            }
            this.toggle = !this.toggle;
        }
    }
}
</script>

<style scoped>
#tags-container{
    display: flex;
    flex-flow: row;
}
#icons{
    display: flex;
    flex-flow: column;
}
.fa-tags{
    color: rgb(164, 164, 164);
    font-size: 15px;
}
div{
    color: rgb(164, 164, 164);
}
input{
    color: white;
    border: none;
    background-color: rgb(63, 69, 83);
    border-radius: 0.25em;
    font-size: 20px;
    padding: 5px;
    padding-left: 10px;
    margin-left: 5px;
    animation: increase cubic-bezier(0.075, 0.82, 0.165, 1) 400ms;
}
i {
    margin-left: 5px;
    color: white;
}
@keyframes increase{
    0% { font-size: 10px; }
    100% { font-size: 20px; }
}
#tag-display{
    margin-left: 10px;
}
</style>
