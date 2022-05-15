<template>
  <div id="login">
    <div class="page">
      <div class="container">
        <div class="left">
          <div class="login">{{register ? 'Register' : 'Login' }}</div>
          <div class="eula">{{register ? 'Already registered?   ' : "Don't have an account?  " }}<a @click="register=!register" style="text-decoration:underline;">{{register ? 'Login instead' : 'Register!'}}</a></div>
        </div>
        <div class="right">
          <div class="form">

            <div v-if="register">
            <label for="username">Username</label>
            <input v-model="username" class="in" type="username" id="username">
            </div>
            
            <label for="email">Email</label>
            <input v-model="email" class="in" type="email" id="email">
            <label for="password">Password</label>
            <input v-model="password" class="in" type="password" id="password">
            <input @click="submit" type="submit" id="submit" value="Submit">
          
          </div>
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
a{
  color: white;
}
.in{
  border-radius: 0.25em;
  box-shadow: rgba(39, 39, 39, 0.25) 0px 54px 55px, rgba(68, 68, 68, 0.12) 0px -12px 30px, rgba(39, 39, 39, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
.page {
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  position: absolute;
  place-content: center;
  width: calc(100% - 40px);
}
@media (max-width: 767px) {
  .page {
    height: auto;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
}
.container {
  display: flex;
  height: 320px;
  margin: 0 auto;
  width: 640px;
}
@media (max-width: 767px) {
  .container {
    flex-direction: column;
    height: 630px;
    width: 320px;
  }
}
.left {
  color: white;
  background: rgb(52, 56, 76);
  height: calc(100% - 40px);
  top: 20px;
  position: relative;
  width: 50%;
}
@media (max-width: 767px) {
  .left {
    height: 100%;
    left: 20px;
    width: calc(100% - 40px);
    max-height: 270px;
  }
}
.login {
  font-size: 50px;
  font-weight: 900;
  margin: 50px 40px 40px;
}
.eula {
  color: #999;
  font-size: 14px;
  line-height: 1.5;
  margin: 40px;
}
.right {
  border-radius: 0.5em;
  background-color: #373b40;
  box-shadow: 0px 0px 40px 16px rgba(0,0,0,0.22);
  color: rgb(221, 217, 217);
  position: relative;
  width: 50%;
}
@media (max-width: 767px) {
  .right {
    flex-shrink: 0;
    height: 100%;
    width: 100%;
    max-height: 350px;
  }
}
svg {
  position: absolute;
  width: 320px;
}
path {
  fill: none;
  stroke: url(#linearGradient);;
  stroke-width: 4;
  stroke-dasharray: 240 1386;
}
.form {
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
  color: #f2f2f2;
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  outline: none !important;
  width: 100%;
}
input::-moz-focus-inner { 
  border: 0; 
}
#submit {
  color: #707075;
  margin-top: 40px;
  transition: color 300ms;
}
#submit:focus {
  color: #f2f2f2;
}
#submit:active {
  color: #d0d0d2;
}

</style>