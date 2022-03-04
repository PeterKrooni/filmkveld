const asyncHandler = require('express-async-handler')

const User = require('../../model/user')
const Suggestion = require('../../model/suggestion')
const Vote = require('../../model/vote') 

/**
 * Gets all votes on every suggestion made by user
 */
const getVotesForUser = asyncHandler(async(userid) => {
    const suggestions = await Suggestion.find({suggested_by: userid})
    var votes = []
    for (var i = 0; i < suggestions.length; i++){
        const vote = await Vote.find({suggestion: suggestions[i]._id})
        votes.push(vote)
    }
    return votes;
})

const updateKarma = asyncHandler(async(userid)=>{
    const votes = await getVotesForUser(userid) 
    const user = await User.findById(userid)
    if (!user){
        res.status(400)
        throw new Error(`User with id ${userid} not found.`)
    }
    console.log("update karma")
    // take average of seen and want to see and assign those values as karma
    var seen = []
    var want_to_see = []
    for (var i = 0; i < votes[0].length; i++){
        seen.push(votes[0][i].seen_rating)
        want_to_see.push(votes[0][i].want_to_see_rating)
    }
    const seen_karma = seen.reduce((partialSum, a) => partialSum + a, 0) / seen.length
    const want_to_see_karma = want_to_see.reduce((partialSum, a) => partialSum + a, 0) / want_to_see.length
    // update karma scores for user
    const newUser = await User.findByIdAndUpdate(userid, {want_to_see_karmascore: want_to_see_karma, seen_karmascore: seen_karma})
    //res.status(200).json(newUser)
})

module.exports = {
    updateKarma
}
