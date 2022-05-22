import axios from 'axios'
import env from './config/env'

export async function apiGetTags(){
    return axios.get(env.crud_url() + "tag/")
}

export async function apiGetTag(tagid){
    return axios.get(env.crud_url() + "tag/" + tagid)
}

export async function apiSubmitTag(tagname){
    return axios.post(env.crud_url() + "tag/", {name: tagname})
}
