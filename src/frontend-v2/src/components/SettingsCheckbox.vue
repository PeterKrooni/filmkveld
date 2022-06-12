<template>
    <div id="sContainer">
        <div id="settingT"><b>{{this.settingName}}</b></div>
        <div id="settingV">
            <label class="switch">    
                <input type="checkbox" v-model="this.defaultState" @change="cs">
                <span class="slider"></span>
            </label>
        </div>
    </div>
</template>


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
    }
}
</script>

<style scoped>

#sContainer {
    display: inline-grid; 
    grid-template-columns: 1fr 1fr;  
    width: 100%; 
}

#settingV, #settingT {
    margin: 12px; 
    display: flex;
}

#settingT {
    align-items: center;
}

#settingV {
    justify-content: right;
}


/** The Style code below is taken from:
link: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_switch
Accesed: 20.05.2022
Publisher: https://www.w3schools.com/
Author: Unknown
*/

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

</style>