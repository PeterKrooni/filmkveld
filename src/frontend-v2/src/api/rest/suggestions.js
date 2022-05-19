import axios from "axios";

// opts: {
//  movieData: Boolean, include movie data in suggestions
//  profileData: Boolean, include suggestor profile data in suggestions
// }
export async function apiGetSuggestions(includeMovieData, includeProfileData){
    return axios.get("http://localhost:5000/rest/api/suggestions/" + includeMovieData + "/" + includeProfileData)
}

export async function apiGetMostWanted(){
    return axios.get("http://localhost:5000/rest/api/suggestions/mostwanted")
}

export async function apiDeleteSuggestion(suggestionID){
    return axios.delete("http://localhost:5000/rest/api/suggestions/" + suggestionID)
}

export async function apiTagSuggestion(tagid, suggestionid){
    return axios.put("http://localhost:5000/rest/api/suggestions/tag/add/", {tag_id: tagid, suggestion_id: suggestionid} )
}

export async function apiGetTagOnSuggestion(sid){
    return axios.get("http://localhost:5000/rest/api/suggestions/tag/get/" + sid)
}