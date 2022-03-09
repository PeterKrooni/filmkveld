const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username required']
    },
    password: {
        type: String,
        required: [true, 'Password required']
    },
    email: {
        type: String,
        required: [true, 'Email required']
    },
    profile_picture: {
        type: String,
        default: "" // TODO find default profile picture
    },
    want_to_see_karmascore: { 
        type: Number,
        default: 10
    },
    seen_karmascore: {
        type: Number,
        default: 10
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)