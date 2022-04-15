const express = require('express')

const {
    getSuggestions, getMostWanted
} = require('./rest.suggestion.controller')

const router = express.Router()
const protect = require('../../../middleware/authMiddleware')

router.route("/:movieData/:profileData")
    .get(protect, getSuggestions)

router.route("/mostwanted")
    .get(protect, getMostWanted)

module.exports = router;