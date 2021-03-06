const asyncHandler = require('express-async-handler')

const Movie = require('../../../model/movie')

// @desc    Get all movies
// @route   GET /api/v1/movie/
// @access  Public
const apiGetMovies = asyncHandler(async(req, res, next)=>{
    const movies = await Movie.find()
    res.status(200).json(movies)
})

// @desc    Get movie with id
// @route   GET /api/v1/movie/:id
// @access  Public
const apiGetMovieWithID = asyncHandler(async(req, res, next)=>{
    if (!req.params.id){
        res.status(400)
        throw new Error("Movie ID required.")
    }
    const movie = await Movie.findById(req.params.id)
    res.status(200).json(movie)
})

// @desc    Get movie with title
// @route   GET /api/v1/movie/:title
// @access  Public
const apiGetMovieWithTitle = asyncHandler(async(req, res, next)=>{
    if (!req.params.title){
        res.status(400)
        throw new Error("Movie title required.")
    }
    const movie = await Movie.find(req.params.title)
    res.status(200).json(movie)
})

// @desc    Add movie
// @route   POST /api/v1/movie/
// @access  Private
const apiAddMovie = asyncHandler(async(req, res, next)=>{
    if (!req.body){
        res.status(400)
        throw new Error("Request body required to add movie to db")
    }
    if (!req.body.title){
        res.status(400)
        throw new Error("Title required to add movie")
    }
    const movie = await Movie.create({
        title: req.body.title,
        source: req.body.source ? req.body.source : "manually added",
        runtime: req.body.runtime,
        director: req.body.director,
        rating: req.body.rating,
        year: req.body.year,
        released: req.body.released,
        actors: req.body.actors,
        plot: req.body.plot,
        language: req.body.language,
        country: req.body.country,
        poster: req.body.poster,
        ratings: req.body.ratings,
        metascore: req.body.metascore,
        imdbRating: req.body.imdbRating,
        imdbVotes: req.body.imdbVotes,
        imdbID: req.body.imdbID

    })
    res.status(200).json(movie)
})

// @desc    Update movie 
// @route   PUT /api/v1/movie/:id
// @access  Private
const apiUpdateMovie = asyncHandler(async(req, res, next)=>{
    const movie = await Movie.findById(req.params.id)

    if(!movie){
        res.status(400)
        throw new Error (`Movie with id ${req.params.id} was not found.`)
    }
    const newMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true}) /*<-- creates new movie if not found*/
    res.status(200).json(newMovie)
})

// @desc    Delete movie
// @route   DELETE /api/v1/movie/:id
// @access  Private
const apiDeleteMovie = asyncHandler(async(req, res, next)=>{
    const movie = await Movie.findById(req.params.id)

    if(!movie){
        res.status(400)
        throw new Error (`Movie with id ${req.params.id} was not found.`)
    }
    await movie.remove()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    apiAddMovie,
    apiDeleteMovie,
    apiGetMovieWithTitle,
    apiGetMovies,
    apiUpdateMovie,
    apiGetMovieWithID,
}