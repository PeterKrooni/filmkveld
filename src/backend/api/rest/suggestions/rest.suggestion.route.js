const express = require('express')

const {
    getSuggestions, getSuggestionsPreloaded, getSuggestionIDsWithVotes, deleteSuggestion, addTag, getTag, removeTag
} = require('./rest.suggestion.controller')

const router = express.Router()
const protect = require('../../../middleware/authMiddleware')

router.route("/")
    .get(protect, getSuggestionsPreloaded)

router.route("/:movieData/:profileData")
    .get(protect, getSuggestions)

router.route("/sidwv")
    .get(protect, getSuggestionIDsWithVotes)

router.route("/:id")
    .delete(protect, deleteSuggestion)

router.route("/tag/add")
    .put(protect, addTag)

router.route("/tag/get/:sid")
    .get(protect, getTag)

router.route("/tag/remove")
    .put(protect, removeTag)



module.exports = router;