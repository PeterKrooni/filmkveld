import axios from 'axios'
import suggestion from '../../../backend/model/suggestion';

export async function apiGetVotesByLoggedIn(vote_suggID){
    
    const suggestions = await axios.get("http://localhost:5000/crud/api/suggestion/")
    console.log(suggestions)
    var votes = []
    for (var i = 0; i < suggestions.data.length; i++){
        const vote = await axios.get("http://localhost:5000/crud/api/vote/"+suggestions.data[i]._id)
        if (vote){
            votes.push(vote)
        }
    }
    return votes
}

export async function apiAddVote(vote_suggID, want_see_rating){
    const data = {want_to_see_rating: want_see_rating}
    return axios.post("http://localhost:5000/crud/api/vote/"+vote_suggID, data)
}

export async function apiRemoveVote(vote_suggID){
    return axios.delete("http://localhost:5000/crud/api/vote/"+vote_suggID)
}

export async function apiUpdateVote(vote_suggID, want_see_rating){
    const data = {want_to_see_rating: want_see_rating}
    return axios.put("http://localhost:5000/crud/api/vote/"+vote_suggID, data)
}

export async function apiVoteWTS(vote_suggID, want_see_rating){
    // check if vote exists to either update or add vote
    axios.get('http://localhost:5000/crud/api/vote/' + vote_suggID)
        .then(() => { // if vote was found
            if (want_see_rating == 0){ // remove vote if rating was 0
                return apiRemoveVote(vote_suggID)
            } else {
                return apiUpdateVote(vote_suggID, want_see_rating)
            }
        })
        .catch(() => {
            if (want_see_rating > 0){
                console.log("new vote.", vote_suggID)
                return apiAddVote(vote_suggID, want_see_rating)
            }
        })
}

export function apiGetVote(suggID){
    return axios.get('http://localhost:5000/crud/api/vote/'+suggID)
}