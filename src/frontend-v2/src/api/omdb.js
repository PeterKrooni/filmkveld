import axios from 'axios'

export async function apiAddMovieFromOMDB(imdb_link){
    return axios.post("http://localhost:5000/rest/api/integration/", {link: imdb_link})
}