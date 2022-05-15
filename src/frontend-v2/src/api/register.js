import axios from 'axios'
import { setJWT } from '../helpers/auth.js'
import { apiLogin } from './login'

export async function apiRegister(name, email, password){
    const details = {name: name, email: email, password: password}
    return axios.post('http://localhost:5000/crud/api/user/', details)
    .then((res)=>{
        setJWT(res.data.token)
        return true
        })
    .catch((err)=>{
        alert(`Could not create account: ${err}`)
        return false
        })
}

export default apiRegister;