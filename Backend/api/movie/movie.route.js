const express = require('express')
const {
    apiAddMovieSuggestion,
    apiDeleteMovie,
    apiGetMovieWithTitle,
    apiGetMovies,
    apiUpdateMovie,
    apiGetMovieWithID,
} = require('./movie.controller')

const router = express.Router()

router.route("/")
    .get(apiGetMovies)
    .post(apiAddMovieSuggestion)

router.route("/:id")
    .get(apiGetMovieWithID)
    .put(apiUpdateMovie)
    .delete(apiDeleteMovie)

router.route("/:title")
    .get(apiGetMovieWithTitle)


module.exports = router;