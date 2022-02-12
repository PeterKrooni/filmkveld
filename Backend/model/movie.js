const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    suggested_by:{
        type: String,
        required: [true, "User ID required to suggest movie"]
    },
    title: {
        type: String,
        required: [true, "Movie title required"]
    },
    runtime: String,
    rating: Number,
})

module.exports = mongoose.model("Movie", movieSchema)