const express = require('express')
const {
    apiAddMovieFromOMDB,
} = require('./rest.omdb.controller')

const router = express.Router()

const protect = require('../../../middleware/authMiddleware')

router.route("/")
    .post(protect, apiAddMovieFromOMDB)

module.exports = router;