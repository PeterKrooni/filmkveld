import axios from 'axios'
import Cookies from 'js-cookies'

export function logout(){
    axios.defaults.headers.common['Authorization'] = undefined
    Cookies.removeItem("jwt")
}

export default logout;