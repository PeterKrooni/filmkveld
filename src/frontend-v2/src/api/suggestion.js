import axios from 'axios'
import env from './config/env'

export async function apiGetAllSuggestions(){
    return axios.get(env.crud_url() + "suggestion/")
}

export async function apiGetAllSuggestionsWithMovieData(){
    return axios.get(env.crud_url() + "suggestion/allmovies/")
}

export async function apiAddSuggestion(movieid){
    const movieID = {movieid: movieid}
    return axios.post(env.crud_url() + "suggestion/", movieID)
}

export async function apiRemoveSuggestion(suggestionid){
    return axios.delete(env.crud_url() + "suggestion/" + suggestionid)
}

export async function apiGetSuggestionsBy(userID){
    return axios.get(env.crud_url() + "suggestion/" + userID)
}

export async function apiGetSuggestionById(suggestionID){
    return axios.get(env.crud_url() + "suggestion/get/" + suggestionID)
}