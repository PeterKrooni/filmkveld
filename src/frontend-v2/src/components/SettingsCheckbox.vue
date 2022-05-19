<template>
    <label for="myToggleButton">
        {{this.settingName}}
        <span v-if="isActivated">On</span>
        <span v-else>Off</span>

        <input type="checkbox" id="myToggleButton" v-model="valueChecker">
        <span class="switcher"></span>
    </label>
</template>


<script>
export default {
    data() {
        return {
            buttonState: this.defaultState
        }
    },
    computed: {
        isActivated() { // activates the current state of the checkbox
            console.log("CurrentState of button is", this.buttonState)
            return this.buttonState 
        },
        valueChecker: {  // updates the value after the elem has been clicked
            set(newState) {
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

</style>