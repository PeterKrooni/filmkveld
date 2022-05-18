const express = require('express')

const {
    getSuggestions, getMostWanted, deleteSuggestion
} = require('./rest.suggestion.controller')

const router = express.Router()
const protect = require('../../../middleware/authMiddleware')

router.route("/:movieData/:profileData")
    .get(protect, getSuggestions)

router.route("/mostwanted")
    .get(protect, getMostWanted)

router.route("/:id")
    .delete(protect, deleteSuggestion)

module.exports = router;