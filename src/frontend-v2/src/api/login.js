import axios from 'axios'
import { setJWT } from '../helpers/auth.js'

export async function apiLogin(email, password){
    const details = {email: email, password: password}
    return axios.post('http://localhost:5000/api/v1/user/login', details)
    .then((res)=>{
        setJWT(res.data.token)
        return true;
        })
    .catch((err)=>{
        console.error(`Could not login: ${err}`)
        return false
        })
}

export default apiLogin;