<template>
  <div id="app">
    <div id="menu">
      <button  @click="logOut">log out</button>
    </div>
  </div>
  <router-view/>
</template>

<script>
import { apiIsLoggedIn } from './helpers/auth'
import { logout } from './helpers/logout'

export default {
  name: 'App',
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
