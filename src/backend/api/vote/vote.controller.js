const asyncHandler = require('express-async-handler')
const Vote = require('../../model/vote')
const Suggestion = require('../../model/suggestion')

// @desc    Vote on suggestion
// @route   POST /api/v1/vote/:suggestionid
// @access  Private
const apiVoteSuggestion = asyncHandler(async(req, res, next) => {
    const suggestion = await Suggestion.findOne({suggestion: req.params.suggestion}) 
    const want_to_see_rating = req.body.want_to_see_rating
    const seen_rating = req.body.seen_rating

    if (!suggestion){
        res.status(400)
        throw new Error (`Suggestion with ID ${req.params.suggestion} was not found.`)
    }
    
    const exists = await Vote.findOne({suggestion: req.params.suggestion, voted_by: req.user.id})
    if (exists){
        res.status(400)
        throw new Error (`User with ID ${req.user.id} already has a vote for suggestion ${req.params.suggestion}. Try updating instead.`)
    }

    if (want_to_see_rating && !seen_rating){
        console.log(want_to_see_rating)
        const vote = await Vote.create({
            suggestion: req.params.suggestion,
            voted_by: req.user.id,
            want_to_see_rating: want_to_see_rating
        })
        if (vote){
            return res.status(200).json({
                id: vote.id,
                suggestion: vote.suggestion,
                want_to_see_rating: vote.want_to_see_rating,
                seen_rating: vote.seen_rating,
            })  
        } else {
            res.status(400)
            throw new Error ('Vote could not be created.')
        }
    } else if (seen_rating && !want_to_see_rating){
        const vote = await Vote.create({
            suggestion: req.params.suggestion,
            voted_by: req.user.id,
            seen_rating: seen_rating
        })
        if (vote){
            return res.status(200).json({
                id: vote.id,
                suggestion: vote.suggestion,
                want_to_see_rating: vote.want_to_see_rating,
                seen_rating: vote.seen_rating,
            })  
        } else {
            res.status(400)
            throw new Error ('Vote could not be created')
        }
    } else {
        res.status(400)
        throw new Error ("Vote needs to either contain want_to_see_rating vote or seen_rating vote")
    }
})

// @desc    Update users vote on a suggestion
// @route   PUT /api/v1/vote/:suggestion
const apiUpdateVote = asyncHandler(async(req, res, next) => {
    const vote = await Vote.findOne({voted_by: req.user.id, suggestion: req.params.suggestion})
    
    if (!vote){
        res.status(404)
        throw new Error(`Vote on suggestion ${req.params.Suggestion} by user ${req.user.id} was not found`)
    }

    const newVote = await Vote.findOneAndUpdate({voted_by: req.user.id, suggestion: req.params.suggestion}, req.body, {new: true}) /*<-- creates new vote if not found*/
    res.status(200).json(newVote)
})

// @desc    Remove vote on suggestion 
// @route   DELETE /api/v1/vote/:suggestions
// @access  Private
const apiRemoveVote = asyncHandler(async(req, res, next) => {
    const userID = req.user.id
    const suggestionID = req.params.suggestion
    const vote = Vote.findOne({voted_by: userID, suggestion: suggestionID})

    if (!vote){
        res.status(400)
        throw new Error (`Could not find vote on suggestion ${suggestionID} by user ${userID}`)
    }

    await vote.remove()
    return res.status(200).json({suggestion: suggestionID, userID: req.user.id})
})

// @desc    Get the users vote on suggestion
// @route   GET /api/v1/vote/:suggestion
// @access  Private
const apiGetVote = asyncHandler(async(req, res, next) => {
    const userID = req.user.id
    const suggestionID = req.params.suggestion
    
    if (!userID || !suggestionID){
        res.status(400)
        throw new Error ('UserID and suggestionID required to get vote.')
    }
    
    const vote = await Vote.findOne({suggestion: suggestionID, voted_by: userID})
    return res.status(200).json(vote)
})
module.exports = {
    apiVoteSuggestion,
    apiRemoveVote,
    apiGetVote,
    apiUpdateVote
}