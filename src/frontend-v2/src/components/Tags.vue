<template>
<div id="tags-container">
    <div id="icons">
        <i class="fa fa-tags" style="margin-top: 5px;"></i>

        <i v-if="!this.toggle" class="fa fa-pencil" style="margin-top: 12px;"  @click="this.toggleInput()"></i>
        <i v-else class="fa fa-times" style="margin-top: 12px;" @click="this.toggleInput()"></i>
    </div>
    <div>
        <div id="tag-display">
            
            <div style="font-size: 14px; margin-bottom: 5px;">Current Tag </div>
            <input id="tag-input" :value="this.current_tag" :disabled="this.toggle">

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
            this.toggle = !this.toggle
        },
        getTags(){
            const imported_tags = [
                {
                    _id: '348953249857234',
                    tagname: 'Korean Movie Night',
                    numtagged: 6, 
                },
                {
                    _id: '8459732459823742345',
                    tagname: 'Lord of the Rings marathon',
                    numtagged: 4, 
                }, 
                {
                    _id: '982347392845',
                    tagname: 'Dune movies',
                    numtagged: 3, 
                }]
            this.tags = imported_tags        
        }
    },
    async mounted() {
        this.getTags();
    }
}
</script>

<style scoped>
#tags-container{
    display: flex;
    flex-flow: row;
}
#tag-select{
    background-color: rgb(124, 168, 185);
    border: none;
    font-size: 13px;
    color: white;
    margin: 2px;
    padding: 5px;
    border-radius: 0.25em;
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
#tag-input{
    color: white; font-size: 14px; font-weight: bold; border: 1px solid white; padding: 5px; border-radius: 0.5em;
    background-color: rgb(63, 69, 83);
}
#tag-input:disabled{
    color: rgb(146, 140, 140);
    background-color: rgb(82, 87, 100);
}
#tag-display{
    margin-left: 10px;
}
i {
    margin-left: 5px;
    color: white;
}
</style>
