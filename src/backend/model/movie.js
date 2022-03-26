const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Movie title required"]
    },
    source: String,
    runtime: String,
    director: String,
    rating: Number,
    
    // these additional values are also present in OMDB responses
    year: String,
    released: String,
    actors: String,
    plot: String,
    language: String,
    country: String,
    poster: String,
    ratings: Object,
    metascore: String,
    imdbRating: String,
    imdbVotes: String,
    imdbID: String,
    DVDRelease: String,
})

module.exports = mongoose.model("Movie", movieSchema)