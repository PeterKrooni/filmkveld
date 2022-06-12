import axios from 'axios'
import env from './config/env'

export async function apiGetVotesByLoggedIn(){
    return axios.get(env.crud_url() + "vote/")
}

export async function apiAddVote(vote_suggID, want_see_rating){
    const data = {want_to_see_rating: want_see_rating}
    return axios.post(env.crud_url() + "vote/"+vote_suggID, data)
}

export async function apiRemoveVote(vote_suggID){
    return axios.delete(env.crud_url() + "vote/"+vote_suggID)
}

export async function apiUpdateVote(vote_suggID, want_see_rating){
    const data = {want_to_see_rating: want_see_rating}
    return axios.put(env.crud_url() + "vote/"+vote_suggID, data)
}

export async function apiVoteWTS(vote_suggID, want_see_rating){
    // check if vote exists to either update or add vote
    axios.get(env.crud_url() + 'vote/' + vote_suggID)
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
    return axios.get(env.crud_url() + 'vote/'+suggID)
}

export function apiVoteSeen(suggID, newRating){
    return axios.post(env.crud_url() + 'vote/'+suggID, {seen: newRating})
}

export function apiVoteRating(suggID, newRating){
    return axios.put(env.crud_url() + 'vote/'+suggID, {rating: newRating})
}