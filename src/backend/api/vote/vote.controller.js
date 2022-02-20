const asyncHandler = require('express-async-handler')
const Vote = require('../../model/vote')
const Suggestion = require('../../model/suggestion')

// @desc    Vote on suggestion
// @route   POST /api/v1/vote/:suggestionid
// @access  Private
const apiVoteSuggestion = asyncHandler(async(req, res, next) => {
    const suggstion = await Suggestion.findOne(req.params.suggestion) 
    const want_to_see = req.body.want_to_see
    const seen = req.body.seen

    if (!suggestion){
        res.status(400)
        throw new Error (`Suggestion with ID ${req.params.suggestion} was not found.`)
    }
    if (want_to_see && !seen){
        const vote = await Vote.create({
            suggestion: req.params.suggestion,
            voted_by: req.user.id,
            want_to_see: req.body.want_to_see
        })
        if (vote){
            res.status(200).json({
                id: vote.id,
                suggestion: vote.suggestion,
                want_to_see: vote.want_to_see,
                seen: vote.seen,
            })  
        } else {
            res.status(400)
            throw new Error ('Vote could not be created.')
        }
    } else if (seen && !want_to_see){
        const vote = await Vote.create({
            suggestion: req.params.suggestion,
            voted_by: req.user.id,
            seen: req.body.seen
        })
        if (vote){
            res.status(200).json({
                id: vote.id,
                suggestion: vote.suggestion,
                want_to_see: vote.want_to_see,
                seen: vote.seen,
            })  
        } else {
            res.status(400)
            throw new Error ('Vote could not be created.')
        }
    } else {
        res.status(400)
        throw new Error ("Vote needs to either contain want_to_see vote or seen vote")
    }
})

// @desc    Remove vote on suggestion 
// @route   DELETE /api/v1/vote/
// @access  Private
const apiRemoveVote = asyncHandler(async(req, res, next) => {
    const userID = req.user.id
    const suggestionID = req.body.suggestion
    const vote = Vote.findOne({voted_by: userID, suggestion: suggestionID})

    if (!vote){
        res.status(400)
        throw new Error (`Could not find vote on suggestion ${suggestionID} by user ${userID}`)
    }

    await vote.remove()
    res.status(200)
})