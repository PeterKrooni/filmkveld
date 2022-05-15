import axios from 'axios'
import Cookies from 'js-cookies'

/**
 * Usage: 
 *  setJWT(optional: JWT token) sets JWT authorization header
 * 
 * This function is called on application entry (main.js), where it gets token passed as undefined
 * If there is a jwt token previously set from another session, it will get this token from the cookies and add it to the headers interceptor
 * Otherwise, this function is called when logging in/registering to store the JWT token in cookies. This requires a token to be passed as an argument.
 */
export function setJWT(token){
    if (token != undefined){
        const cookie = Cookies.getItem("jwt")
        if (cookie == undefined){
            Cookies.setItem("jwt", token, {httpOnly: true, secure: true, sameSite: 'strict', expires: 30})
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.getItem("jwt")}`    
    }else if (Cookies.getItem("jwt") != undefined){
        axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.getItem("jwt")}`    
    }
 }

 /**
  * Check if user is logged in, by checking if they have a JWT cookie set
  * Called when accessing privileged views
  */
export function apiIsLoggedIn(){
    const cookie = Cookies.getItem("jwt")
    if (cookie == undefined){
        return false
    } else {
        return axios.post("http://localhost:5000/crud/api/auth/", {token: cookie})
    }
}

 export default setJWT;

