import axios from 'axios'

export async function apiAddMovieFromOMDB(imdb_link){
    return axios.post("http://localhost:5000/api/v1/integration/", {link: imdb_link})
}