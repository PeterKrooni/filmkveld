<template> 
    <div id="menu">
        <div id="box">
            <div class='menu-btn' @click="logOut" :text='"Log out"' >Log out</div> <div class="separator"> · </div>
            <div class='menu-btn' @click="this.$router.push('/profile')">Profile</div> <div class="separator"> · </div>
            <div class='menu-btn' @click="this.$router.push('/')">Home</div> <div class="separator"> · </div>
            <div class='menu-btn' @click="logOut">Movies</div>
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
    }
  },
  methods: {
    logOut(){
      logout();
      this.loggedIn = apiIsLoggedIn();
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
#menu{
  position: fixed; 
  bottom: 0;
  width: 99vw;
  background-color: rgba(29, 24, 24, 0.144);
  padding-left: 38%;
  z-index: 999;
  opacity: 1;
  transition-duration: 200ms;
}
#menu:hover{
  transition-duration: 200ms;
  background-color: rgb(29, 24, 24);
}
#box{
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: center;
  flex-flow: row;
  font-weight: lighter;
  letter-spacing: 1.5px;
}
.separator{
  margin-left: 5px;
  margin-right: 5px;
  font-size: 30px;
}
.menu-btn{
  margin: 5px;  
  font-size: 14px;
  color: rgb(161, 108, 108);
}
.menu-btn:hover{
  cursor: pointer;
  color: white;
}
</style>