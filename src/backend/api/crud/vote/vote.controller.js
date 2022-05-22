const asyncHandler = require('express-async-handler')
const Vote = require('../../../model/vote')
const Suggestion = require('../../../model/suggestion')
const { updateKarma } = require('../vote/voteCounter')
const User = require('../../../model/user')

// @route POST /api/v1/vote/:suggetionId
const apiVoteSeen = asyncHandler(async(req, res, next) => {
    const vote = await Vote.findOne({voted_by: req.user.id, suggestion: req.params.suggestion})
    
    if (!vote) {
        const newVote = await Vote.create({voted_by: req.user.id, suggestion: req.params.suggestion, seen: req.body.seen})
        res.status(200).json(newVote)
    }
    else {
        const updatedVote = await Vote.findByIdAndUpdate(vote._id, {seen: req.body.seen})
        res.status(200).json(updatedVote)
    }

})


// @route PUT /api/v1/vote/:suggetionId
const apiVoteRating = asyncHandler(async(req, res, next) => {
    const vote = await Vote.findOne({voted_by: req.user.id, suggestion: req.params.suggestion})
    if (!vote) {
        const newVote = await Vote.create({voted_by: req.user.id, suggestion: req.params.suggestion, rating: req.body.rating})
        
        const suggestion = await Suggestion.findById(vote.suggestion)
        const user = await User.findById(suggestion.suggested_by)
        console.log(user)
        await User.findByIdAndUpdate(user._id, {karma: user.karma + req.body.rating})

        res.status(200).json(newVote)
    }
    else {
        const updateVote = await Vote.findByIdAndUpdate(vote._id, {rating: req.body.rating})
        const suggestion = await Suggestion.findById(vote.suggestion)
        const user = await User.findById(suggestion.suggested_by)   
        await User.findByIdAndUpdate(user._id, {karma: user.karma + req.body.rating})
        res.status(200).json(updateVote)
    }

})


// @desc    Get votes by user
// @route   GET /
// @access  Private
const apiGetVotesByUser = asyncHandler(async(req, res, next) => {
    const votes = await Vote.find({voted_by: req.user.id})
    if (!votes){
        return res.status(204).json(votes)
    }
    return res.status(200).json(votes)
})


// @desc    Remove vote on suggestion 
// @route   DELETE /api/v1/vote/:suggestions
// @access  Private
const apiRemoveVote = asyncHandler(async(req, res, next) => {
    const userID = req.user.id
    const suggestionID = req.params.suggestion
    const vote = Vote.findOne({voted_by: userID, suggestion: suggestionID})
    const suggestion = await Suggestion.findOne(req.params.suggestion)

    if (!vote){
        res.status(400)
        throw new Error (`Could not find vote on suggestion ${suggestionID} by user ${userID}`)
    }

    await vote.remove()
    await apiUpdateKarma(suggestion.suggested_by)
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
    return res.status(vote ? 200 : 204).json(vote)
})

const apiUpdateKarma = asyncHandler(async(userid) => {
    const updated = await updateKarma(userid)
    return updated
})


module.exports = {
    apiRemoveVote,
    apiGetVote,
    apiGetVotesByUser,
    apiVoteRating,
    apiVoteSeen
}