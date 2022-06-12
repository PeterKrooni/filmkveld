<template>
<div id="suggestion-sort-container">
    <label for="sortby" id="label-sortby">
      <i class="fa fa-sort" @click="toggleSelect"></i>
    </label>
    
    <select v-if="toggle" name="sortby" id="select-sortby" :model="key" @change="onChange($event)">
        <option value="newest">Date added (newest)</option>
        <option value="oldest">Date added (oldest)</option>
        <option value="imdb">IMDB Rating</option>
        <option value="not_rated">Not rated</option>
        <option value="not_seen">Not seen</option>
    </select>
<!--
                <div style="display: flex; flex-flow: column; align-items: flex-end;">
            <div style="display: flex; flex-flow: row; align-items: center; justify-content: space-evenly;">
                <h4 style="margin-right: 15px;"> Show tags by default: </h4> <Test />
            </div>
            <div style="display: flex; flex-flow: row; align-items: center; justify-content: space-evenly;">
                <h4 style="margin-right: 15px; color: grey;"> Show date created by default: </h4> <Test />
            </div>
            <div style="display: flex; flex-flow: row; align-items: center; justify-content: space-evenly;">
                <h4 style="margin-right: 15px;"> Show submitter karma on suggestions: </h4> <Test />
            </div>
            <div style="display: flex; flex-flow: row; align-items: center; justify-content: space-evenly;">
                <h4 style="margin-right: 15px; color: grey;"> Automatically mark your suggestions as seen: </h4> <Test />
            </div>
            <div style="display: flex; flex-flow: row; align-items: center; justify-content: space-evenly;">
                <h4 style="margin-right: 15px;"> Filter suggestions by tag when entering a tag: </h4> <Test />
            </div>
            </div>
 -->
</div>
</template>

<script>
export default {
    data() {
        return {
            toggle: false,
            key: ""
        }
    },
    methods: {
        onChange(event){
            this.$emit('change', event.target.value)
        },
        toggleSelect(){
            this.toggle = !this.toggle
        }
    },
    emits: ['change']
}
</script>

<style>
#suggestions-sort-container{
    height: 40px;
}
#label-sortby{
    color: rgb(78, 78, 78);
    margin-right: 10px;
    font-size: 24px;
}
#label-sortby:hover{
    color: rgba(141, 139, 139, 0.687);
    transition-duration: 250ms;
}
#select-sortby{
    background: none;
    border: 1px solid black;
    font-size: 12px;
    border-radius: 0.125em;
    color: rgb(137, 136, 136);
}
</style>