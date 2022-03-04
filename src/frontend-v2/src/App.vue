<template>
  <div id="app">
    <div id="menu">
      <Button class='menu-btn' @click="logOut" :text='"Log out"' /> 
      <Button class='menu-btn' @click="logOut" :text='"Profile"' /> 
      <Button class='menu-btn' @click="logOut" :text='"➕Add movie"' /> 
    </div>
  </div>
  <router-view/>
</template>

<script>
import Button from './components/Button.vue'

import { apiIsLoggedIn } from './helpers/auth'
import { logout } from './helpers/logout'

export default {
  name: 'App',
  components: {
    Button
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
  display: flex;
  justify-content: right;
  align-items: center;
  flex-flow: row-reverse;
}
.menu-btn{
  margin: 5px;  
}
</style>
