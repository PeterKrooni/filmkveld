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
})

module.exports = mongoose.model("Movie", movieSchema)