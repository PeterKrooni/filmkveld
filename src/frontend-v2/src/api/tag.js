import axios from 'axios'

export async function apiGetTags(){
    return axios.get("http://localhost:5000/crud/api/tag/")
}

export async function apiGetTag(tagid){
    return axios.get("http://localhost:5000/crud/api/tag/" + tagid)
}

export async function apiSubmitTag(tagname){
    return axios.post("http://localhost:5000/crud/api/tag/", {name: tagname})
}
