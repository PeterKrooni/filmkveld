const express = require('express')

const {
    getSuggestions, getMostWanted, deleteSuggestion, addTag, getTag, removeTag
} = require('./rest.suggestion.controller')

const router = express.Router()
const protect = require('../../../middleware/authMiddleware')

router.route("/:movieData/:profileData")
    .get(protect, getSuggestions)

router.route("/mostwanted")
    .get(protect, getMostWanted)

router.route("/:id")
    .delete(protect, deleteSuggestion)

router.route("/tag/add")
    .put(protect, addTag)

router.route("/tag/get/:sid")
    .get(getTag)

router.route("/tag/remove")
    .put(protect, removeTag)



module.exports = router;