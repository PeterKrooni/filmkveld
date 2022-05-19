const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tagname required']
    },    
    submitted_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User ID required to add tag'],
        ref: 'User',
    },
})

module.exports = mongoose.model('Tag', tagSchema)