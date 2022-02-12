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
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)