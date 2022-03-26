<template> 
    <div id="menu">
        <div @click="toggle_navmenu" id="hamburger">
            <div id="brg-l"></div>
            <div id="brg-m"></div>
            <div id="brg-r"></div>
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
  background-color: rgb(189, 162, 41);
  border-bottom-right-radius: 0.5em;
  z-index: 999;
  opacity: 1;
  transition-duration: 200ms;
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
  height: 2px;
  background-color: rgb(0, 0, 0);
  border-radius: 0.5em;
  transition-duration: 250ms;
}
#hamburger:hover > #brg-l{
  margin-right: 15px;
  margin-top: 10px;
  width: 22px;
  transition-duration: 50ms;
  transform: rotateZ(90deg);
}
#hamburger:hover > #brg-m{
  width: 22px;
  transition-duration: 150ms;
  transform: rotateZ(90deg);
}
#hamburger:hover > #brg-r{
  margin-left: 15px;
  margin-bottom: 12px;
  width: 22px;
  transition-duration: 300ms;
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
  color: white;
}
.menu-btn{
  margin: 5px;  
  font-size: 20px;
  color: rgb(0, 0, 0);
}
.menu-btn:hover{
  transition-duration: 100ms;
  cursor: pointer;
  color: white;
}
</style>