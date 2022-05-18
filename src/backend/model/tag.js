const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tagname required']

    }
})

module.exports = mongoose.model('Tag', tagSchema)