const mongoose = require('mongoose')

const suggestionSchema = mongoose.Schema({
    suggested_by: {
        type: mongoose.Schema.type.ObjectId,
        required: [true, 'User ID required to add suggestion'],
        ref: 'User',
    },
    movie_id: {
        type: mongoose.Schema.type.ObjectId,
        required: [true, 'Movie ID required to add suggestion'],
        ref: 'Movie',
    },
})
