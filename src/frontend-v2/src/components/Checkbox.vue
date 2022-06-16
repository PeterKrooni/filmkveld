<template>
<div>
    <div id="container">
        <div id="outer" @click="cs" :style="this.defaultState ? 'background-color: rgb(100, 190, 100); transform: rotateZ(180deg);' : ''">
            <div v-if="this.defaultState" style="transform: rotateZ(-180deg); text-align: center; color: white">Yes!</div>
        </div>
        <div id="inner" @click="cs" :style="this.defaultState ? inner_on : inner_off">
            <svg :style="this.defaultState ? 'fill: white;' : 'fill: lightblue;'" xmlns="http://www.w3.org/2000/svg"> 
                <circle :cx="this.circle_size" :cy="this.circle_size" :r="this.circle_size" /> 
            </svg>    
            <img v-if="this.defaultState" id="checkmark" src="https://img.favpng.com/18/14/9/check-mark-computer-icons-icon-design-cheque-clip-art-png-favpng-mZqdunP14HCNhNqgs26DNPRcY.jpg" alt="">
        </div>
    </div>
</div>
</template>
<!--
from profile.vue
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
<script>
export default {
    props: {
        settingName: "",
        defaultState: false
    },
    methods: {
        cs(){
            this.$emit("changeSetting")
        }
    },
    data() {
        return {
            circle_size: 12,
            inner_off: 'margin-left: 8px;',
            inner_on: 'margin-left: -440px;',
            toggled: false,
        }
    }
}
</script>

<style scoped>
#container{
    position: relative;
}
#outer{
    width: 50px;
    height: 24px;
    padding: 4px;
    background-color: rgb(108, 108, 108);
    border-left: 4px solid rgb(46, 75, 87);
    border-bottom: 4px solid rgb(56, 81, 90);
    border-radius: 2em;
    z-index: 3;
    transition: cubic-bezier(0.19, 1, 0.22, 1) 400ms;
    cursor: pointer;
}
#inner {
    position: absolute;
    top: 0;
    margin-top: 4px;
    transition-duration: 200ms;
    cursor: pointer;
}
#checkmark {
    position: absolute;
    top: 0;
    left: 0;
    margin-left: 4px;
    margin-top: 4px;
    width: 16px;
    height: 16px;
}
</style>