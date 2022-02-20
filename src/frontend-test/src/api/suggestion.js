import axios from 'axios'
import suggestion from '../../../backend/model/suggestion'

export async function apiGetAllSuggestions(){
    return axios.get("http://localhost:5000/api/v1/suggestion/")
}

export async function apiAddSuggestion(movieid){
    const movieID = {movieid: movieid}
    return axios.post("http://localhost:5000/api/v1/suggestion/", movieID)
}

export async function apiRemoveSuggestion(suggestionid){
    return axios.delete("http://localhost:5000/api/v1/suggestion/" + suggestionid)
}