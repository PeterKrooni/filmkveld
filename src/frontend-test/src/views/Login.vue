<template>
    <div id="login">
        <div id="form-container">
            <div id="form">
                <input v-model="email" type="text" name="email" class='default-input' placeholder="Email">
                <input v-model="pass" type="password" name="password" class='default-input' placeholder="Password" id="pass">
                <input type="submit" @click="login()" class="default-button" value="Log in">
                
                <div v-if="loggedIn" style="margin-top: 50px;">Logged in
                    <button @click="logOut()" class="default-button">Log out</button>
                 </div>    
                 <button @click="sendRequest()" class="default-button">Send test request</button>

                <Alert 
                    :show="showMessage" @close="showMessage = false"
                    :header="'Message'"
                    :body="`Logged in as ${this.email}`"
                    :footer="'Success'"
                    :confirmation="'Ok'">
                </Alert>
            </div>
        </div>
    </div>
    <!--<Teleport />-->
</template>

<script>
import { apiLogin }  from '../api/login.js'
import { logout } from '../helpers/logout.js'
import axios from 'axios'
import Alert from '../components/modals/Alert.vue'
export default{
    name: 'Login',  
    components: {
        Alert
    },  
    data() {
        return {
            email: "tob@email.com",
            pass: "tob",
            loggedIn: false,
            showMessage: false,
        }
    }, 
    methods:{
        login: async function(){
            this.loggedIn = await apiLogin(this.email, this.pass)
            if (this.loggedIn){
                this.showMessage = true; 
            }
        },
        logOut: async function(){
            await logout();
            this.loggedIn = false;
        },
        sendRequest: async function(){
            axios.get('http://localhost:5000/api/v1/user/me')
                .then((response)=>{console.log(response)})
        }
    },
    mounted(){
        
    }
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

.default-button{
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