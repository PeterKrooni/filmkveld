<template>
  <div id="app">
  </div>
  <router-view/>
</template>

<script>
import Button from './components/Button.vue'
import TextInput from './components/TextInput.vue'

import { apiIsLoggedIn } from './helpers/auth'
import { logout } from './helpers/logout'

export default {
  name: 'App',
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

