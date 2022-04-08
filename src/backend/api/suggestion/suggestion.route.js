const express = require('express')

const {
    apiGetSuggestions, apiAddSuggestion, apiGetSuggestion, apiDeleteSuggestion, apiGetSuggestionById, apiGetSuggestionsWithMovieData
} = require('./suggestion.controller')

const router = express.Router()
const protect = require('../../middleware/authMiddleware')

router.route("/")
    .get(apiGetSuggestions)
    .post(protect, apiAddSuggestion)

router.route("/allmovies")
    .get(apiGetSuggestionsWithMovieData)

router.route("/:id")
    .get(apiGetSuggestion)
    .delete(protect, apiDeleteSuggestion)

router.route("/get/:suggestion_id")
    .get(protect, apiGetSuggestionById)

module.exports = router;