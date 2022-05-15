import axios from 'axios'

export async function apiGetUser(userid, profile_picture=false){
    const user = await axios.get("http://localhost:5000/crud/api/user/"+userid)
    if (profile_picture){
        const avatar = await axios.get("http://localhost:5000/crud/api/user/"+userid+"/avatar")
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
    const user = await axios.get("http://localhost:5000/crud/api/user/me")
    return { 
        username: user.data.name, 
        userid: user.data.id, 
        profile_picture: user.data.profile_picture,
        karma: user.karma
    };
}

export async function apiUpdateProfilePicture(userid, base64_img){
    const user = await axios.put("http://localhost:5000/crud/api/user/" + userid, {profile_picture: base64_img})
    return {username: user.data.name, userid: user.data.id, profile_picture: user.data.profile_picture}
}