import axios from 'axios'

export async function apiGetAllSuggestions(){
    return axios.get("http://localhost:5000/crud/api/suggestion/")
}

export async function apiGetAllSuggestionsWithMovieData(){
    return axios.get("http://localhost:5000/crud/api/suggestion/allmovies/")
}

export async function apiAddSuggestion(movieid){
    const movieID = {movieid: movieid}
    return axios.post("http://localhost:5000/crud/api/suggestion/", movieID)
}

export async function apiRemoveSuggestion(suggestionid){
    return axios.delete("http://localhost:5000/crud/api/suggestion/" + suggestionid)
}

export async function apiGetSuggestionsBy(userID){
    return axios.get("http://localhost:5000/crud/api/suggestion/" + userID)
}

export async function apiGetSuggestionById(suggestionID){
    return axios.get("http://localhost:5000/crud/api/suggestion/get/" + suggestionID)
}