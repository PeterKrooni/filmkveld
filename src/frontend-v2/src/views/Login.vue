<template>
    <div id="login">
        <button @click="login" style="width:50px;">log in</button>
    </div>
</template>

<script>
import { apiLogin } from '../api/login'
export default {
  methods: {
    async login(){
      await apiLogin("tob@email.com", "tob");
      this.$router.push('/')
    }
  }
}
</script>