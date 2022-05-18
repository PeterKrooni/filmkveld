const asyncHandler = require('express-async-handler')
const Suggestion = require('../../../model/suggestion')
const Vote = require('../../../model/vote')
const Movie = require('../../../model/movie')
const User = require('../../../model/user')

// @desc    Get suggestions (opts include movie data, profile data in response)
// @route   GET /:movieData/:profileData
// @access  Public
const getSuggestions = asyncHandler(async(req, res, next) => {
    const includeMovieData = req.params.movieData === 'true'
    const includeProfileData = req.params.profileData === 'true'
    let suggestions = await Suggestion.find()
    if (!suggestions){
        res.status(400)
        throw new Error("No suggestions found in rest api getSuggestions.")
    }


    if (includeMovieData || includeProfileData){
        for (s in suggestions){
            if (includeMovieData){
                suggestions[s].movie_id = await Movie.findById(suggestions[s].movie_id)
            }
            if (includeProfileData){
                suggestions[s].suggested_by = await User.findById(suggestions[s].suggested_by).select(['-password', '-email']) 
            }
        }
    }

    return res.status(200).json(suggestions)
})

// @desc    Get most "want to see" voted suggestion
// @route   GET /mostwanted
// @access  Public
const getMostWanted = asyncHandler(async(req, res, next) => {
    const s = await Suggestion.findOne();
    console.log("TODO implement getMostWanted in rest.suggestion.controller")
    return res.status(200).json(s)
})

// @desc    Delete suggestion, revert karma from votes on suggestion on user that made suggestion, and delete movie 
// @params  id: ID of suggestion to delete
// @route   DELETE /:id
// @access  Private
const deleteSuggestion = asyncHandler(async(req, res, next) => {
    if (!req.params.id){
        return res.status(400).json({message: `deleteSuggestion:: Error from suggestion rest: Missing suggestion id in params`})
    }
    const suggestion = await Suggestion.findById(req.params.id)
    if (!suggestion){
        console.log(`deleteSuggestion:: Error from suggestion rest: Could not find suggestion with id ${req.params.id}`)
        return res.status(404).json({message: `deleteSuggestion:: Error from suggestion rest: Could not find suggestion with id ${req.params.id}`})
    }
    const movie = await Movie.findById(suggestion.movie_id)
    if (!movie){
        console.log(`deleteSuggestion:: Error from suggestion rest: Could not find movie with id ${suggestion.movie_id}`)
        return res.status(404).json({message: `deleteSuggestion:: Error from suggestion rest: Could not find movie with id ${suggestion.movie_id}`})
    }    
    const user = await User.findById(suggestion.suggested_by)
    if (!user){
        console.log(`deleteSuggestion:: Error from suggestion rest: Could not find user with id ${suggestion.suggested_by}`)
        return res.status(404).json({message: `deleteSuggestion:: Error from suggestion rest: Could not find user with id ${suggestion.suggested_by}`})
    }

    // Make sure only user that submitted suggestion can delete it
    if (suggestion.suggested_by.toString() !== req.user.id){
        console.log('deleteSuggestion:: Error from suggestion rest: Caller User ID does not correspond to suggestee User ID')
        return res.status(401).json({message: 'deleteSuggestion:: Error from suggestion rest: Caller User ID does not correspond to suggestee User ID'})
    }

    const votesOnSuggestion = await Vote.find({suggestion: suggestion._id})
    var absoluteKarmaDifference = 0
    for (var i = 0; i<votesOnSuggestion.length; i++){
        absoluteKarmaDifference += votesOnSuggestion[i].rating
    }
    await User.findByIdAndUpdate(suggestion.suggested_by, {karma: user.karma - absoluteKarmaDifference})
    await Vote.deleteMany({suggestion: suggestion._id})
    await Suggestion.deleteOne({_id: suggestion._id})
    await Movie.deleteOne({_id: suggestion.movie_id})

    return res.status(200).json({message: "deleteSuggestoion: Deletion successful."})
})

module.exports = {
    getSuggestions,
    getMostWanted,
    deleteSuggestion
}
