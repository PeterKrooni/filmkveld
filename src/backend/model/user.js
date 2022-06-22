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
    karma: { 
        type: Number,
        default: 0
    },
    settings: { 
        tag_setting: {
            type: Boolean,
            default: false
        },
        date_setting: {
            type: Boolean,
            default: false
        }
    },
    discord_user: {
        is_discord_user: {
            type: Boolean, 
            default: false
        },
        discord_id: {
            type: String,
            default: ""
        }
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)