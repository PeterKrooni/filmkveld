<template> 
    <div id="menu">
        <div id="box">
            <Button class='menu-btn' @click="logOut" :text='"Log out"' /> 
            <Button class='menu-btn' @click="logOut" :text='"Profile"' /> 
            <Button class='menu-btn' @click="logOut" :text='"➕Add movie"' /> 
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
    position: absolute; 
    top: 0;
}
#box{
  display: flex;
  justify-content: left;
  align-items: center;
  flex-flow: row;
}
.menu-btn{
  margin: 5px;  
}
</style>