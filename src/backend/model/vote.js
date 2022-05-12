const mongoose = require('mongoose')

const voteSchema = mongoose.Schema({
    voted_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User ID required to vote'],
        ref: 'User',
    },
    suggestion: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Suggestion ID required to vote'],
        ref: 'Suggestion',
    },
    seen: {
        default: false,
        type: Boolean,
    },
    rating: {
        default: 0,
        type: Number,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Vote", voteSchema)