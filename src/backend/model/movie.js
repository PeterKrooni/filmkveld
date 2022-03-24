const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Movie title required"]
    },
    source: String,
    runtime: {
        type: Date,
        validate: {
            validator: v => (new Date(v) !== "Invalid Date") && !isNaN(new Date(v)),
            message: props => `${props.value} is not a valid date`
        },
    },
    director: String,
    rating: Number,
})

module.exports = mongoose.model("Movie", movieSchema)