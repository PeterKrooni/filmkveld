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

const protect = require('../../middleware/authMiddleware')

router.route("/")
    .get(apiGetMovies)
    .post(protect, apiAddMovie)

router.route("/:id")
    .get(apiGetMovieWithID)
    .put(protect, apiUpdateMovie)
    .delete(protect, apiDeleteMovie)

router.route("/:title")
    .get(apiGetMovieWithTitle)


module.exports = router;