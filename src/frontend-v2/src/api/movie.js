import axios from 'axios'

export async function apiGetMovies(){
    return axios.get("http://localhost:5000/crud/api/movie/")
}

export async function apiGetMovie(movieID){
    return axios.get("http://localhost:5000/crud/api/movie/"+movieID)
}

export default apiGetMovies;