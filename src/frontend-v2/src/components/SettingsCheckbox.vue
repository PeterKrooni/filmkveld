<template>
    <div id="sContainer">
        <div id="settingT"><b>{{this.settingName}}</b></div>
        <div id="settingV">
            <label class="switch">    
                <input type="checkbox" v-model="valueChecker">
                <span class="slider"></span>
            </label>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            buttonState: this.defaultState
        }
    },
    computed: {
        valueChecker: {  // updates the value after the elem has been clicked
            set(newState) {
                console.log("CurrentState of button is", newState)
                this.buttonState = newState;
                this.$emit("change", newState) // makes value available for parent component
            }
        }
    },
    props: {
        settingName: "",
        defaultState: {
            type: Boolean,
            default: false
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
    margin: 8px; 
    display: flex;
}

#settingT {
    align-items: center;
}

#settingV {
    justify-content: right;
}


/** The Style code is taken from:
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_switch
Accesed: 20.05.2022
Publisher: https://www.w3schools.com/howto/howto_css_switch.asp
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