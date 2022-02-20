const express = require('express')

const {
    apiGetSuggestions, apiAddSuggestion, apiGetSuggestion, apiDeleteSuggestion
} = require('./suggestion.controller')

const router = express.Router()
const protect = require('../../middleware/authMiddleware')

router.route("/")
    .get(apiGetSuggestions)

router.route("/:id")
    .get(apiGetSuggestion)
    .post(protect, apiAddSuggestion)
    .delete(protect, apiDeleteSuggestion)

module.exports = router;