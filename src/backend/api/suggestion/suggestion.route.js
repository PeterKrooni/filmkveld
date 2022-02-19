const express = require('express')

const {
    apiGetSuggestions, apiAddSuggestion, apiGetSuggestion
} = require('./suggestion.controller')

const router = express.Router()
const protect = require('../../middleware/authMiddleware')

router.route("/")
    .get(apiGetSuggestions)
    .post(protect, apiAddSuggestion)

router.route("/:id")
    .post(apiGetSuggestion)