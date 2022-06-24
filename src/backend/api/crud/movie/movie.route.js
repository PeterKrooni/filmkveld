const express = require('express')
const {
    apiAddMovie,
    apiDeleteMovie,
    apiGetMovieWithTitle,
    apiGetMovies,
    apiUpdateMovie,
    apiGetMovieWithID,
} = require('./movie.controller')

const router = express.Router()

const protect = require('../../../middleware/authMiddleware')

router.route("/")
    .get(protect, apiGetMovies)
    .post(protect, apiAddMovie)

router.route("/:id")
    .get(protect, apiGetMovieWithID)
    .put(protect, apiUpdateMovie)
    .delete(protect, apiDeleteMovie)

router.route("/:title")
    .get(protect, apiGetMovieWithTitle)


module.exports = router;