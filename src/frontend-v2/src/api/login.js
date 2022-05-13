import axios from 'axios'
import { setJWT } from '../helpers/auth.js'

export async function apiLogin(email, password){
    const details = {email: email, password: password}
    return axios.post('http://localhost:5000/crud/api/user/login', details)
    .then((res)=>{
        setJWT(res.data.token)
        return true;
        })
    .catch((err)=>{
        alert(`Failed to validate login: ${err}`)
        return false
        })
}

export default apiLogin;