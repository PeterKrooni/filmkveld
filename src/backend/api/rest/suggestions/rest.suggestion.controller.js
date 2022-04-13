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
                let movies = await Movie.find({_id: {$in: suggestions.map(s => s.movie_id)}})
                for (m in movies){
                    if (movies[m]._id.equals(suggestions[s].movie_id)){
                        suggestions[s].movie_id = movies[m]
                    }
                }
            }
            if (includeProfileData){
                let users = await User.find({_id: {$in: suggestions.map(s => s.suggested_by)}}).select(['-password', '-email'])
                for (u in users){
                    if (users[u]._id.equals(suggestions[s].suggested_by)){
                        suggestions[s].suggested_by = users[u]
                    }
                }
            }
        }
    }

    return res.status(200).json(suggestions)
})

module.exports = {
    getSuggestions
}
