<template>
    <div id="login">
        <div id="form-container">
            <div id="form">
                <input v-model="user" type="text" name="username" class='default-input' placeholder="Username" id="user">
                <input v-model="pass" type="password" name="password" class='default-input' placeholder="Password" id="pass">
                <input type="submit" @click="login()" id="login-button" value="Log in">
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'Login',
    data() {
        return{
            user: "",
            pass: ""
        }
    },
    methods:{
        login: async function(){
            // login here
            console.log(this.user + " " + this.pass)
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