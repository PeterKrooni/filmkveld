const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    source: {
        type: String,
        default: "manually added",
    },
    title: {
        type: String,
        required: [true, "Movie title required"]
    },
    runtime: String,
    rating: Number,
})

module.exports = mongoose.model("Movie", movieSchema)