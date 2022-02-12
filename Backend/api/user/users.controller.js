const asyncHandler = require('express-async-handler')

const User = require('../../model/user')

// @desc    Get user
// @route   GET /api/v1/user/:id
// @access  Private
const apiGetUser = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)    
})

// @desc    Get all users
// @route   GET /api/v1/user/
// @access  Private
const apiGetUsers = asyncHandler(async(req, res, next) => {
    const users = await User.find()
    res.status(200).json(users)    
})

      
// @desc    Add user
// @route   POST /api/v1/user/
// @access  Private
const apiAddUser = asyncHandler(async(req, res, next) => {
    if (!req.body.name || !req.body.password){
        res.status(400)
        throw new Error('Username and password required.')
    }

    const user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email ? req.body.email : "none"  
    })

    res.status(200).json(user)
})

// @desc    Update user
// @route   PUT /api/v1/user/:id
// @access  Private
const apiUpdateUser = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user){
        res.status(400)
        throw new Error(`User with id ${req.params.id} not found.`)
    }
    const newUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true} /*<-- creates new if not exists*/)
    res.status(200).json(newUser)
})

// @desc    Delete user
// @route   DELTE /api/v1/user/:id
// @access  Private
const apiDeleteUser = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user){
        res.status(400)
        throw new Error(`User with id ${req.params.id} not found.`)
    }
    await user.remove()
    res.status(200).json({id: req.params.id})
})


module.exports = {
    apiAddUser,
    apiDeleteUser,
    apiGetUser, apiGetUsers,
    apiUpdateUser
}