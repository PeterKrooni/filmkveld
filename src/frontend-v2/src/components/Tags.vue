<template>
<div id="tags-container">
    <div id="icons">
        <i class="fa fa-tags" style="margin-top: 5px;"></i>

        <i v-if="this.toggle" class="fa fa-pencil" style="margin-top: 12px;"  @click="this.toggleInput()"></i>
        <i v-else class="fa fa-times" style="margin-top: 12px;" @click="this.toggleInput()"></i>
    </div>
    <div>
        <div id="tag-display">
            
            <div style="font-size: 14px; margin-bottom: 5px;">
                Current Tag: 
                <span style="color: white;">
                    {{this.currently_tagged_as.name}}
                    <i 
                        v-if="this.currently_tagged_as !== ''" 
                        @click="this.$emit('clear_tag')" 
                        class="fa fa-times" 
                        style="font-size: 12px; color: darkred; margin-left: 2px;">
                    </i>
                </span>
            </div>
            <input id="tag-input" v-model="current_tag" :style="this.currently_hovered === 0 ? 'opacity: 0.5' : ''" :disabled="this.toggle" @keyup="keyEntered">
            <div v-for="(item, index) in this.matchingtags" :key="item">
                <div 
                class="tag-suggestions" 
                @click="this.tagClicked(index)"
                :style="index === this.matchingtags.length - 1 ? 
                'border-bottom-right-radius: 0.3em;' : // bottom tag
                ''" 
                > <i class="fa fa-tags" :style="'margin-left: -10px; margin-right: 5px; font-size: 10px;'"></i>{{item.name}} </div>
            </div>
        </div>
    </div>
</div>    
</template>

<script>
import { apiGetTags, apiSubmitTag } from '../api/tag'

export default {
    data(){
        return {
            tag_input: '',
            current_tag: '',
            selected_tag: '',
            toggle: true,
            matchingtags: [],
            currently_hovered: 0,
            tags: [],
        }
    },
    props: {
        currently_tagged_as: '',
    },
    methods: {
        keyEntered(event){
            switch(event.key){
                case 'Enter':
                    this.tagSubmitted(this.current_tag)
                    this.toggleInput()
                    break;
                case 'Backspace':
                    break;
                case 'Escape':
                    this.cancelTagSelect()
                    break;
            }
            if (this.current_tag.length > 2){
                this.refreshMatchingTags()
            }else{
                this.matchingtags = []
            }
        },
        refreshMatchingTags(){
            this.matchingtags = this.tags.filter(x => x.name.includes(this.current_tag) && !this.matchingtags.includes(x))
        },
        toggleInput(){
            this.toggle = !this.toggle
        },
        tagClicked(index){
            this.$emit('tagged', this.matchingtags[index])
            this.cancelTagSelect()
        },
        async tagSubmitted(name){
            if(confirm(`Add tag ${name}?`)){
                await apiSubmitTag(name)
                .then((res)=>{
                    this.getTags()
                    this.$emit('tagged', res.data)
                })
                .catch((err) => {alert(err)})
            }
        },
        cancelTagSelect(){
            this.matchingtags = []
            this.toggle = true
            this.current_tag = ''
        },
        async getTags(){
            const allTags = await apiGetTags()
            this.tags = allTags.data;      
            // trim duplicates, add to total count of tags 
        }
    },
    async mounted() {
        this.getTags();
    },
    emits: ['tagged', 'clear_tag']
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
    position: absolute;
    margin-left: 10px;
}
i {
    margin-left: 5px;
    color: white;
}
.tag-suggestions{
    color: white;
    font-size: 14px;
    margin-left: 40px;
    padding: 2px;
    padding-left: 10px;
    border-right: 1px solid grey;
    border-bottom: 1px solid grey;
}
.tag-suggestions:hover{
    cursor: pointer;
    background-color: rgb(118, 150, 181);
}
</style>
