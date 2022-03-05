import axios from 'axios'

export async function apiGetUser(userid){
    const user = await axios.get("http://localhost:5000/api/v1/user/"+userid)
    return {username: user.data.username, userid: user.data.userid};
}

export async function getMe(){
    const user = await axios.get("http://localhost:5000/api/v1/user/me")
    return {username: user.data.name, userid: user.data.id};
}