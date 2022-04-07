<template> 
    <div id="menu">
        <div id="menu-text">Menu</div>
        <div @click="toggle_navmenu" id="hamburger">
            <div id="brgl" v-bind:class="{ brglrot: toggleMenu }"></div>
            <div id="brgm" v-bind:class="{ brgmrot: toggleMenu }"></div>
            <div id="brgr" v-bind:class="{ brgrrot: toggleMenu }"></div>
        </div>
        <div v-if="toggleMenu" id="box">
            <div class="separator"> · </div>
            <div class='menu-btn' @click="logOut" :text='"Log out"' >Log out</div> <div class="separator"> · </div>
            <div class='menu-btn' @click="this.$router.push('/profile')">Profile</div> <div class="separator"> · </div>
            <div class='menu-btn' @click="this.$router.push('/')">Home</div> <div class="separator"> · </div>
            <div class='menu-btn' @click="this.$router.push('/movies')">Movies</div> <div class="separator"> · </div>
        </div>
    </div>
</template>

<script>
import Button from './Button.vue'
import TextInput from './TextInput.vue'

import { apiIsLoggedIn } from '../helpers/auth'
import { logout } from '../helpers/logout'

export default {
  components: {
    Button,
    TextInput
  },
  data() {
    return {
      toggleMenu: false,
    }
  },
  methods: {
    logOut(){
      logout();
      this.loggedIn = apiIsLoggedIn();
      this.$router.push('/login')
    },
    toggle_navmenu(){
      this.toggleMenu = !this.toggleMenu;
    }
  }
}
</script>

<style scoped>
#menu{
  position: fixed; 
  top: 0;
  left: 0;
  background-color: #3A4750;
  border-bottom-right-radius: 0.5em;
  z-index: 999;
  opacity: 1;
  transition-duration: 200ms;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
#menu-text{
  display: flex;
  width: 90px;
  justify-content: center;
  align-items: center;
  font-weight: lighter;
  font-size: 18px;
  color: #EEEEEE;
  margin-bottom: -2px;
}
#hamburger{
  width: 90px;
  height: 35px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
#hamburger > div{
  margin: 2px;
  width: 40px;
  height: 1px;
  background-color: #EEEEEE;
  border-radius: 0.5em;
  transition-duration: 250ms;
}

#hamburger:hover > #brgl{
  margin-right: 15px;
  margin-top: 10px;
  width: 22px;
  transition-duration: 150ms;
  transform: rotateZ(90deg);
}
#hamburger:hover > #brgm{
  width: 22px;
  transition-duration: 170ms;
  transform: rotateZ(90deg);
}
#hamburger:hover > #brgr{
  margin-left: 15px;
  margin-bottom: 12px;
  width: 22px;
  transition-duration: 240ms;
  transform: rotateZ(90deg);
}

#box{
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: center;
  flex-flow: column;
  font-weight: lighter;
  letter-spacing: 1.5px;
  padding: 5px;
}
.separator{
  font-size: 50px;
  font-weight: lighter;
  color: rgb(168, 172, 175);
}
.menu-btn{
  margin: 5px;  
  font-size: 20px;
  color: #EEEEEE;
}
.menu-btn:hover{
  transition-duration: 100ms;
  cursor: pointer;
  color: white;
}
</style>