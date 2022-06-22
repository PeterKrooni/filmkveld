/**
 * Takes in access token from Discord OAUTH2
 * Checks if a user account with the users Discord ID already exists,
 * if not, register a new account. 
 */

 import axios from 'axios'

export async function getDiscordInformation(access_token, token_type){
    const info = axios.get('https://discord.com/api/users/@me',{
        headers: {
            'Authorization': ` ${token_type} ${access_token}`
        }
    })
    .then((res) => {
        if (res.data.avatar){
            res.data.avatar = `https://cdn.discordapp.com/avatars/${res.data.id}/${res.data.avatar}` 
        } else{
            res.data.avatar = "https://seeklogo.com/images/D/discord-color-logo-E5E6DFEF80-seeklogo.com.png" //todo add this to cloudinary
        }
        return res
    })
    .catch((err) => {
        console.log(`Failed to get Discord account information: ${err}`)
    })
    return info

}
