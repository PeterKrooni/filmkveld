const express = require('express')

const {
    getSuggestions
} = require('./rest.suggestion.controller')

const router = express.Router()
const protect = require('../../../middleware/authMiddleware')

router.route("/:movieData/:profileData")
    .get(protect, getSuggestions)

module.exports = router;