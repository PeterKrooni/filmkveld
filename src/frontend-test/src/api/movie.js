import axios from 'axios'

export async function apiGetMovies(){
    return axios.get("http://localhost:5000/api/v1/movie/")
}

export default apiGetMovies;