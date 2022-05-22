import axios from 'axios'
import env from './config/env'

export async function apiAddMovieFromOMDB(imdb_link){
    return axios.post(env.rest_url() + "integration/", {link: imdb_link})
}