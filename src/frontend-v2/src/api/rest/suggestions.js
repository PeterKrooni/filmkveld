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