const mongoose = require('mongoose')

const suggestionSchema = mongoose.Schema({
    suggested_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User ID required to add suggestion'],
        ref: 'User',
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Movie ID required to add suggestion'],
        ref: 'Movie',
    },
})

module.exports = mongoose.model("Suggestion", suggestionSchema)
