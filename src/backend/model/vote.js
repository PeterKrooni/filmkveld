const mongoose = require('mongoose')

const voteSchema = mongoose.Schema({
    voted_by: {
        type: mongoose.Schema.type.ObjectId,
        required: [true, 'User ID required to vote'],
        ref: 'User',
    },
    movie_id: {
        type: mongoose.Schema.type.ObjectId,
        required: [true, 'Movie ID required to vote'],
        ref: 'Suggestion',
    },
    want_to_see_rating: {
        default: true,
        type: Number,
    },
    seen_rating: {
        default: false,
        type: Number,
    }
})