const asyncHandler = require('express-async-handler')
const Movie = require('../../../model/movie')
const Suggestion = require('../../../model/suggestion')
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()
const OMDB_KEY = process.env.OMDB_API_KEY || ""

// @desc    Add movie from OMDB request, request body link: imdb page link
// @route   POST /api/v1/integration/
// @access  Public
const apiAddMovieFromOMDB = asyncHandler(async(req, res, next)=>{
    if (!req.body.link){
        res.status(400)
        throw new Error("Adding movie from OMDB failed: no imdb link")
    }
    var link_arr = req.body.link.split("/")
    var imdb_id = ""
    for (var i = 0; i<link_arr.length; i++){
        if (link_arr[i] === 'title'){
            if (i+1 >= link_arr.length){
                throw new Error(`Invalid IMDB link: ${req.body.link}`)
            } else {
                imdb_id = link_arr[i+1]
            }
        } 
    }

    let existing = await Movie.exists({imdbID: imdb_id})
    if (existing){
        res.status(409)
        throw new Error(`Movie with imdb ID ${imdb_id} already exists.`)
    }

    var omdb_request_link =
    "http://www.omdbapi.com/" +
    "?i=" + imdb_id + 
    "&apikey=" + OMDB_KEY
    
    const omdb_response = await axios.get(omdb_request_link)
    if (!omdb_response){
        res.status(400)
        throw new Error(`OMDB returned nothing on IMDB id ${imdb_id}`)
    }

    // TODO: code below shouldn't be done here, this functionality already exists
    // perhaps make this entire controller into a middleware function or something

    // create movie
    const movie = await Movie.create({
        title: omdb_response.data.Title,
        source: "https://www.imdb.com/title/" + omdb_response.data.imdbID,
        runtime: omdb_response.data.Runtime,
        director: omdb_response.data.Director,
        rating: omdb_response.data.Ratings[0].value,
        year: omdb_response.data.Released,
        released: omdb_response.data.released,
        actors: omdb_response.data.Actors,
        plot: omdb_response.data.Plot,
        language: omdb_response.data.Language,
        country: omdb_response.data.Country,
        poster: omdb_response.data.Poster,
        ratings: omdb_response.data.Ratings,
        metascore: omdb_response.data.Metascore,
        imdbRating: omdb_response.data.imdbRating,
        imdbVotes: omdb_response.data.imdbVotes,
        imdbID: omdb_response.data.imdbID
    })

    // automatically create suggestion
    const suggestion = await Suggestion.create({ 
        suggested_by: req.user.id, 
        movie_id: movie.id})

    return res.status(200).json({movie: movie, suggestion: suggestion})
})

module.exports = {
    apiAddMovieFromOMDB
}