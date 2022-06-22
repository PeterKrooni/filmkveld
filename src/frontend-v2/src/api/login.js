import axios from 'axios'
import { setJWT } from '../helpers/auth.js'
import env from './config/env'

export async function apiLogin(email, password){
    const details = {email: email, password: password}
    return axios.post(env.crud_url() + 'user/login', details)
    .then((res)=>{
        setJWT(res.data.token)
        return true;
        })
    .catch((err)=>{
        alert(`Failed to validate login: ${err}`)
        return false
        })
}

export async function apiLoginDiscord(discord_info){
    const details = {discord_id: discord_info.id, name: discord_info.username, profile_picture: discord_info.avatar}
    return axios.post(env.crud_url() + "user/discord", details)
    .then((res) => {
        setJWT(res.data.token)
        return true
    })
    .catch((err) => {
        console.error(`Failed to create user account from Discord: ${err}`)
        return false
    })
}


export default apiLogin;