const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../model/user')

// @desc    Authenticate user login
// @route   POST /api/v1/user/login
// @access  Public
const apiAuthUser = asyncHandler(async(req, res, next) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid login.')
    }
})

// @desc    Get user
// @route   GET /api/v1/user/me
// @access  Private
const apiGetMe = asyncHandler(async(req, res, next) => {
    const {_id, name, email} = await User.findById(req.user.id) // user.id from auth middleware
    res.status(200).json({
        id: _id,
        name: name,
        email: email
    })
})

// @desc    Register user
// @route   POST /api/v1/user/
// @access  Private
const apiRegisterUser = asyncHandler(async(req, res, next) => {
    const {name, email, password} = req.body
    
    if (!name || !password || !email){
        res.status(400)
        throw new Error('Username and password required to register user.')
    }

    const alreadyExists = await User.findOne({email})

    if (alreadyExists){
        res.status(400)
        throw new Error(`The email ${email} is already in use.`)
    }

    const salt = await bcrypt.genSalt()
    const hashed = await bcrypt.hash(password, salt)

    const user = await User.create({
        name: req.body.name,
        password: hashed,
        email: req.body.email ? req.body.email : "none"  
    })

    if (user){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error ('User could not be created.    ')
    }
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

// @desc    Get all users
// @route   GET /api/v1/user/
// @access  Private
const apiGetUsers = asyncHandler(async(req, res, next) => {
    const users = await User.find()
    res.status(200).json(users)    
})

// @desc    Get user with ID
// @route   GET /api/v1/user/:id
// @access  Private
const apiGetUser = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user){
        res.status(400)
        throw new Error(`User with id ${req.params.id} not found.`)
    }
    const ret = {username: user.name, userid: user._id}
    res.status(200).json(ret)
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '90d' })
}

module.exports = {
    apiRegisterUser,
    apiDeleteUser,
    apiGetMe, apiGetUsers, apiGetUser,
    apiUpdateUser, apiAuthUser
}