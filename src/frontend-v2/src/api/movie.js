import axios from 'axios'
import env from './config/env'

export async function apiGetMovies(){
    return axios.get(env.crud_url() + "movie/")
}

export async function apiGetMovie(movieID){
    return axios.get(env.crud_url() + "movie/"+movieID)
}

export default apiGetMovies;