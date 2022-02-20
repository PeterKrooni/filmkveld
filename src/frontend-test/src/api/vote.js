import axios from 'axios'
import suggestion from '../../../backend/model/suggestion';

export async function apiGetVotesByLoggedIn(vote_suggID){
    
    const suggestions = await axios.get("http://localhost:5000/api/v1/suggestion/")
    console.log(suggestions)
    var votes = []
    for (var i = 0; i < suggestions.data.length; i++){
        const vote = await axios.get("http://localhost:5000/api/v1/vote/"+suggestions.data[i]._id)
        if (vote){
            votes.push(vote)
        }
    }
    return votes
}

export async function apiAddVote(vote_suggID, want_see_rating){
    const data = {want_to_see_rating: want_see_rating}
    return axios.post("http://localhost:5000/api/v1/vote/"+vote_suggID, data)
}

export async function apiRemoveVote(vote_suggID){
    return axios.delete("http://localhost:5000/api/v1/vote/"+vote_suggID)
}

export async function apiUpdateVote(vote_suggID, want_see_rating){
    const data = {want_to_see_rating: want_see_rating}
    return axios.put("http://localhost:5000/api/v1/vote/"+vote_suggID, data)
}
