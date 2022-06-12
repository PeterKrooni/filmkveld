import axios from 'axios'
import env from './config/env'

export async function apiGetUser(userid, profile_picture=false){
    const user = await axios.get(env.crud_url() + "user/"+userid)
    if (profile_picture){
        const avatar = await axios.get(env.crud_url() + "user/"+userid+"/avatar")
        return {
            username: user.data.username, 
            userid: user.data.userid, 
            profile_picture: avatar.data.profile_picture,
            karma: user.data.karma,
        };
    } else {
        return {
            username: user.data.username, 
            userid: user.data.userid,
            karma: user.data.karma,
        };
    }
}

export async function getMe(){
    const user = await axios.get(env.crud_url() + "user/me")
    return { 
        username: user.data.name, 
        userid: user.data.id, 
        profile_picture: user.data.profile_picture,
        karma: user.data.karma,
        settings: user.data.settings
    };
}

export async function apiUpdateUserSettings(userid, oldSettings, settingType, value){
    const newSettings = { ...oldSettings };
    newSettings[settingType] = value;
    const user = await axios.put("http://localhost:5000/crud/api/user/" + userid, {settings: newSettings});
    return {username: user.data.name, userid: user.data.id, settings: user.data.settings}
}

export async function apiUpdateProfilePicture(userid, base64_img){
    const user = await axios.put(env.crud_url() + "user/" + userid, {profile_picture: base64_img})
    return {username: user.data.name, userid: user.data._id, profile_picture: user.data.profile_picture}
}

export async function apiGetTopKarmaUsers(limit){
    return axios.get(env.crud_url() + "user/top/karma/" + limit)
}