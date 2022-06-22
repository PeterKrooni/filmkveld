import axios from 'axios'
import env from './config/env'
import { setJWT } from '../helpers/auth.js'

export async function apiRegister(name, email, password){
    const details = {name: name, email: email, password: password, profile_picture: 'https://res.cloudinary.com/dzp42orzn/image/upload/v1653130536/default-profile-picture.png'}
    if (name.length > 20){
        alert(`Name length cannot be greater than 20, length: ${name.length}`)
        return false
    }    
    if (email.length > 30){
        alert(`Email length cannot be greater than 30, length: ${email.length}`)
        return false
    }
    return axios.post(env.crud_url() + 'user/', details)
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