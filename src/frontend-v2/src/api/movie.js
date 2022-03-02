import axios from 'axios'

export async function apiGetMovies(){
    return axios.get("http://localhost:5000/api/v1/movie/")
}

export async function apiGetMovie(movieID){
    return axios.get("http://localhost:5000/api/v1/movie/"+movieID)
}

export default apiGetMovies;