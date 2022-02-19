<template>
    <div id="register">
        <div id="form-container">
            <div id="form">
                <input v-model="user" type="text" name="username" class='default-input' placeholder="Username" id="user">
                <input v-model="email" type="text" name="email" class='default-input' placeholder="Email" id="email">
                <input v-model="pass" type="password" name="password" class='default-input' placeholder="Password" id="pass">
                <input type="submit" @click="register()" id="login-button" value="Register">
            </div>
        </div>
    </div>
</template>

<script>
import { apiRegister } from '../api/register'
export default{
    name: 'Register',
    data() {
        return{
            user: "",
            email: "",
            pass: ""
        }
    },
    methods:{
        register: async function(){
            const success = apiRegister(this.user, this.email, this.pass)
            if (success){
                this.$router.push({name: "Home", params:{loggedin: success}})
            }
        }
    },
}
</script>

<style scoped>
.default-input{
    margin: 10px;
    font-size: 20px;
    border: none;
    border-bottom: 1px solid black;
}
.default-input:focus{
    outline: none;
}

#form-container{
    position: absolute;
    bottom: 50%;
    width: 99%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

#form{
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
}

#login-button{
    margin-top: 25px;
    font-size: 16px;
    border-radius: 0.4em;
    border: 1px solid grey;
    background-color: white;
    width: 100%;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
}
</style>