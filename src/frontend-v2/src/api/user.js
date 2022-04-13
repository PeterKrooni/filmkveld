import axios from 'axios'

export async function apiGetUser(userid, profile_picture=false){
    const user = await axios.get("http://localhost:5000/crud/api/user/"+userid)
    if (profile_picture){
        const avatar = await axios.get("http://localhost:5000/crud/api/user/"+userid+"/avatar")
        return {
            username: user.data.username, 
            userid: user.data.userid, 
            profile_picture: avatar.data.profile_picture,
            wts_karma: user.data.wts_karma,
            seen_karma: user.data.seen_karma,
        };
    } else {
        return {
            username: user.data.username, 
            userid: user.data.userid,
            wts_karma: user.data.wts_karma,
            seen_karma: user.data.seen_karma,
        };
    }
}

export async function getMe(){
    const user = await axios.get("http://localhost:5000/crud/api/user/me")
    console.log(user)
    return { 
        username: user.data.name, 
        userid: user.data.id, 
        profile_picture: user.data.profile_picture,
        wts_karma: user.data.wts_karma,
        seen_karma: user.data.seen_karma,
    };
}

export async function apiUpdateProfilePicture(userid, base64_img){
    const user = await axios.put("http://localhost:5000/crud/api/user/" + userid, {profile_picture: base64_img})
    return {username: user.data.name, userid: user.data.id, profile_picture: user.data.profile_picture}
}