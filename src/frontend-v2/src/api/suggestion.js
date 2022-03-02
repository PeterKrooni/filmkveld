import axios from 'axios'

export async function apiGetAllSuggestions(){
    return axios.get("http://localhost:5000/api/v1/suggestion/")
}

export async function getUserFromSuggestion(suggestionID){
    const suggestion = await axios.get("http://localhost:5000/api/v1/suggestion/"+suggestionID)
    return axios.get("http://localhost:5000/api/v1/user/"+suggestion.suggested_by)
}

export async function apiAddSuggestion(movieid){
    const movieID = {movieid: movieid}
    return axios.post("http://localhost:5000/api/v1/suggestion/", movieID)
}

export async function apiRemoveSuggestion(suggestionid){
    return axios.delete("http://localhost:5000/api/v1/suggestion/" + suggestionid)
}