<template>
  <div id="login">
    <div class="container">
      <div id="sign-container">
        <div class="login">{{register ? 'Register' : 'Login' }}</div>
        <div class="register-login-switch">{{register ? 'Already registered?   ' : "Don't have an account?  " }}<a @click="register=!register" style="text-decoration:underline; color: white;">{{register ? 'Login instead' : 'Register!'}}</a></div>
      </div>
      <div id="login-form-container">
        <div class="login-form">

          <div v-if="register">
          <label for="username">Username</label>
          <input v-model="username" class="form-inputs" type="username" id="username">
          </div>
          
          <label for="email">Email</label>
          <input v-model="email" class="form-inputs" type="email" id="email">
          <label for="password">Password</label>
          <input v-model="password" class="form-inputs" type="password" id="password">
          <input @click="submit" type="submit" id="submit" value="Submit">
        
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiLogin } from '../api/login'
import { apiRegister } from '../api/register'
import { setJWT } from '../helpers/auth.js'

export default {
  methods: {
    async login(){
      await apiLogin("tob@email.com", "tob");
      this.$router.push('/')
    },
    async submit(){
      if (this.register){
        await apiRegister(this.username, this.email, this.password)
        .then((res) => {
          if (res){
            this.$router.push('/')
          } else {
            alert("Account creation failed.")
          }
        })
      }else{
        await apiLogin(this.email, this.password)
        this.$router.push('/') 
      }
    }
  },
  data() {
    return {
      register: false,
      username: "",
      password: "tob",
      email: "tob@email.com"
    }
  }
}
</script>

<style scoped>
.form-inputs{
  border-radius: 0.25em;
  box-shadow: rgba(39, 39, 39, 0.25) 0px 54px 55px, rgba(68, 68, 68, 0.12) 0px -12px 30px, rgba(39, 39, 39, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
.container {
  display: flex;
  flex-flow: row;
  height: 320px;
  width: 640px;
}
#sign-container {
  color: white;
  background: rgb(52, 56, 76);
  height: calc(100% - 40px);
  top: 20px;
  position: relative;
  width: 50%;
}
.login {
  font-size: 50px;
  font-weight: 900;
  margin: 50px 40px 40px;
}
.register-login-switch {
  color: rgb(197, 197, 197);
  font-size: 12px;
  margin: 40px;
}
#login-form-container {
  border-radius: 0.5em;
  background-color: #373b40;
  box-shadow: 0px 0px 40px 16px rgba(0,0,0,0.22);
  color: rgb(221, 217, 217);
  position: relative;
  width: 50%;
}
.login-form {
  margin: 40px;
  position: absolute;
}
label {
  color:  #c2c2c5;
  display: block;
  font-size: 14px;
  height: 16px;
  margin-top: 10px;
  margin-bottom: 5px;
}
input {
  background: transparent;
  border: 0;
  color: white;
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  outline: none;
  width: 100%;
}
#submit {
  margin-top: 40px;
  color: rgb(172, 172, 172);
}
@media (max-width: 800px) {
  .login{
    font-size: 25px;
  }
  input {
    margin: 0px;
  }
  .login-form {
    margin: 20px;
    margin-top: 40px;
    position: absolute;
  }
}

</style>