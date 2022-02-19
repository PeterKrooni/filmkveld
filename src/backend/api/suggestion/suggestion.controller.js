const asyncHandler = require('express-async-handler')
const Suggestion = require('../../model/suggestion')

// @desc    Get all suggestions
// @route   GET /api/v1/suggestion/
// @access  Public
const apiGetSuggestions = asyncHandler(async(req, res, next) => {
    const test = await Suggestion.find()
    return res.status(200).json(test)
})

// @desc    Get all suggestions
// @route   GET /api/v1/suggestion/:id
// @access  Public
const apiGetSuggestion = asyncHandler(async(req, res, next) => {
    const suggestion = await Suggestion.findOne(req.body.suggested_by)
    return res.status(200).json(suggestion)
})

// @desc    Add movie suggestion
// @route   POST /api/v1/suggestion/
// @access  Private
const apiAddSuggestion = asyncHandler(async(req, res, next) => { 
    const suggestion = await Suggestion.create({ 
        suggested_by: req.user.id, 
        movieid: req.body.movieid })
    return res.status(200).json(suggestion)
})

module.exports = {
    apiGetSuggestions,
    apiAddSuggestion,
    apiGetSuggestion,
}
