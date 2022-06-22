import axios from "axios";
import env from '../config/env'

// opts: {
//  movieData: Boolean, include movie data in suggestions
//  profileData: Boolean, include suggestor profile data in suggestions
// }
export async function apiGetSuggestions(includeMovieData, includeProfileData){
    return axios.get(env.rest_url() + "suggestions/" + includeMovieData + "/" + includeProfileData)
}

export async function apiGetSuggestionsPreloaded(){
    return axios.get(env.rest_url() + "suggestions/")
}

export async function apiGetMostWanted(){
    return axios.get(env.rest_url() + "suggestions/mostwanted")
}

export async function apiDeleteSuggestion(suggestionID){
    return axios.delete(env.rest_url() + "suggestions/" + suggestionID)
}

export async function apiTagSuggestion(tagid, suggestionid){
    return axios.put(env.rest_url() + "suggestions/tag/add/", {tag_id: tagid, suggestion_id: suggestionid} )
}

export async function apiGetTagOnSuggestion(sid){
    return axios.get(env.rest_url() + "suggestions/tag/get/" + sid)
}

export async function apiGetSuggestionsWithVotes(){
    return axios.get(env.rest_url() + "suggestions/sidwv")
}