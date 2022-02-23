const asyncHandler = require('express-async-handler')
const Suggestion = require('../../model/suggestion')
const Vote = require('../../model/vote')
const Movie = require('../../model/movie')

// @desc    Get all suggestions
// @route   GET /api/v1/suggestion/
// @access  Public
const apiGetSuggestions = asyncHandler(async(req, res, next) => {
    const suggestions = await Suggestion.find()
    return res.status(200).json(suggestions)
})

// @desc    Get suggestion by user
// @route   GET /api/v1/suggestion/:id
// @access  Public
const apiGetSuggestion = asyncHandler(async(req, res, next) => {
    const suggestion = await Suggestion.findOne(req.body.suggested_by)
    return res.status(200).json(suggestion)
})

// @desc    Delete suggestion, and all corresponding votes on suggestion
// @route   DELETE /api/v1/suggestion/:id
// @access  Private
const apiDeleteSuggestion = asyncHandler(async(req, res, next) => {
    const suggestion = await Suggestion.findById(req.params.id)

    if(!suggestion){
        res.status(400)
        throw new Error (`Suggestion with id ${req.params.id} was not found.`)
    }
    if(suggestion.suggested_by != req.user.id){
        res.status(400)
        throw new Error (`${req.user.id} tried to delete a suggestion but suggestion suggested by was ${suggestion.suggested_by}`)
    }
    await suggestion.remove()
    await Vote.deleteMany({suggestion: req.params.id}) // delete votes on suggestion

    res.status(200).json({id: req.params.id})
})

// @desc    Add movie suggestion
// @route   POST /api/v1/suggestion/
// @access  Private
const apiAddSuggestion = asyncHandler(async(req, res, next) => { 
    const suggestionExists = await Suggestion.findOne({movie_id: req.body.movieid})
    if (suggestionExists){
        res.status(409)
        throw new Error("Movie has already been suggested")
    }

    const movieExists = await Movie.findById(req.body.movieid)
    if (!movieExists){
        res.status(400)
        throw new Error(`Tried to suggest movie, but no movie with id ${req.body.movieid} was found.`)
    } 

    const suggestion = await Suggestion.create({ 
        suggested_by: req.user.id, 
        movie_id: req.body.movieid })
    return res.status(200).json(suggestion)
})

module.exports = {
    apiGetSuggestions,
    apiAddSuggestion,
    apiGetSuggestion,
    apiDeleteSuggestion,
}
