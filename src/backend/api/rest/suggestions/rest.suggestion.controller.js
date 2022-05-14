const asyncHandler = require('express-async-handler')
const Suggestion = require('../../../model/suggestion')
const Vote = require('../../../model/vote')
const Movie = require('../../../model/movie')
const User = require('../../../model/user')

// @desc    Get suggestions (opts include movie data, profile data in response)
// @route   GET /
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
                suggestions[s].suggested_by = await User.findById(suggestions[s].suggested_by).select(['-password', '-email', '-profile_picture']) 
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

module.exports = {
    getSuggestions,
    getMostWanted
}
