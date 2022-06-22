/**
 * Takes in access token from Discord OAUTH2
 * Checks if a user account with the users Discord ID already exists,
 * if not, register a new account. 
 */

 import axios from 'axios'

export async function getDiscordId(token){
    const res = axios.get('https://discord.com/api/users/@me',{
        headers: {
            'Authorization': token
        }
    })
    console.log(res)
}