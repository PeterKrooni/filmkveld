const asyncHandler = require('express-async-handler')
const Tag = require('../../../model/tag')


// @desc    Get all tags
// @route   GET /
// @access  Public
const apiGetTags = asyncHandler(async(req, res, next) => {
    const tags = await Tag.find()
    return res.status(200).json(tag)
})

// @desc    Get tag with tagid
// @params  id: ID of tag
// @route   GET /:id
// @access  Private
const apiGetTag = asyncHandler(async(req, res, next) => {
    if (!req.params.id){
        console.log("apiGetTag:: Error in tag controller, missing tag id")
        return res.status(400).json({message: "apiGetTag:: Error in tag controller, missing tag id"})
    }
    const tag = await Tag.findById(req.params.id)
    if (!tag){
        console.log(`apiGetTag:: Error in tag controller, no tag found with id ${req.params.id}`)
        return res.status(404).json({message: `apiGetTag:: Error in tag controller, no tag found with id ${req.params.id}`})
    }
    return res.status(200).json(tag)
})

// @desc    Add new tag
// @body    name: Text content of tag
// @route   POST /
// @access  Private
const apiAddTag = asyncHandler(async(req, res, next) => {
    if (!req.body.name){
        console.log('apiAddTag:: Error in tag controller, missing tag name')
        return res.status(400).json({message: 'apiAddTag:: Error in tag controller, missing tag name'})
    }
    const tag = await Tag.create({name: req.body.name})
    return res.status(200).json(tag)
})

// @desc    Delete tag
// @params  id: ObjectID of tag
// @route   DELETE /:id
// @access  Private
const apiRemoveTag = asyncHandler(async(req, res, next) => {
    if (req.params.id === ''){
        console.log('apiRemoveTag:: Error in tag controller, missing tag id')
        return res.status(400).json({message: 'apiRemoveTag:: Error in tag controller, missing tag id'})
    }
    const tag = await Tag.findByIdAndDelete({_id: req.params.id})
    if (!tag){
        console.log(`apiRemoveTag:: Error in tag controller, no tag found with id ${req.params.id}`)
        return res.status(404).json({message: `apiRemoveTag:: Error in tag controller, no tag found with id ${req.params.id}`})
    }
    return res.status(200).json(tag)
})

// @desc    Update tag
// @body    id: ObjectID of tag, name: New text content of tag
// @route   PUT /
// @access  Private
const apiUpdateTag = asyncHandler(async(req, res, next) => {
    if (!req.body.name){
        console.log('apiUpdateTag:: Error in tag controller, missing tag name')
        return res.status(400).json({message: 'apiUpdateTag:: Error in tag controller, missing tag name'})
    }
    if (!req.body.id){
        console.log('apiUpdateTag:: Error in tag controller, missing tag id')
        return res.status(400).json({message: 'apiUpdateTag:: Error in tag controller, missing tag id'})
    }
    const tag = await Tag.findByIdAndUpdate({_id: req.body.id}, {name: req.body.name})
    if (!tag){
        console.log(`apiUpdateTag:: Error in tag controller, no tag found with id ${req.body.id}`)
        return res.status(404).json({message: `apiUpdateTag:: Error in tag controller, no tag found with id ${req.body.id}`})
    }
    return res.status(200).json(tag)
})

module.exports = {
    apiGetTags,
    apiGetTag,
    apiAddTag,
    apiRemoveTag,
    apiUpdateTag,
}