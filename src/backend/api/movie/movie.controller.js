const asyncHandler = require('express-async-handler')

const Movie = require('../../model/movie')

// @desc    Get all movies
// @route   GET /api/v1/movie/
// @access  Publicc
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
const apiAddMovieSuggestion = asyncHandler(async(req, res, next)=>{
    if (!req.body.title || !req.body.suggested_by){
        res.status(400)
        throw new Error("Title and suggested by required.")
    }
    const movie = await Movie.create({
        title: req.body.title,
        suggested_by: req.body.suggested_by,
        runtime: req.body.runtime,
        rating: req.body.rating
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
    apiAddMovieSuggestion,
    apiDeleteMovie,
    apiGetMovieWithTitle,
    apiGetMovies,
    apiUpdateMovie,
    apiGetMovieWithID,
}