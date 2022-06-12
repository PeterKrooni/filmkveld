const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../../model/user')

// Image CDN
require('dotenv').config()
const cloudinary = require('cloudinary').v2

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
    const {_id, name, email, profile_picture, karma, settings} = await User.findById(req.user.id) // user.id from auth middleware
    res.status(200).json({
        id: _id,
        name: name,
        email: email,
        profile_picture: profile_picture,
        karma: karma,
        settings: settings
    })
})

// @desc    Register user
// @route   POST /api/v1/user/
// @access  Private
const apiRegisterUser = asyncHandler(async(req, res, next) => {
    const {name, email, password, profile_picture} = req.body
    
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
        email: req.body.email ? req.body.email : "none",
        profile_picture: profile_picture
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

    let body = req.body
    if (req.body.profile_picture){
        const uploaded = await cloudinary.uploader
            .upload(req.body.profile_picture, {
                resource_type: 'image',
                public_id: req.params.id,
                tags: 'profile_picture',
                quality: 20,
                height: 150,
                width: 150,
                crop: "limit"
            })
            .catch((err) => {
                return res.status(500).err(`apiUpdateUser:: Error in user controller, upload to cloudinary image CDN failed, error: ${err}`)
            })
        body.profile_picture = uploaded.secure_url
    }
    const newUser = await User.findByIdAndUpdate(req.params.id, body)
    return res.status(200).json({karma: newUser.karma, _id: newUser._id, profile_picture: newUser.profile_picture, name: newUser.name, settings: newUser.settings})
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
    const ret = {
        username: user.name, 
        userid: user._id,
        karma: user.karma
    }
    res.status(200).json(ret)
})

// @desc    Get profile picture / avatar of user with ID :id
// @route   GET /api/v1/user/:id/avatar
// @access  Private
const apiGetProfilePicture = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user){
        res.status(400)
        throw new Error(`User with id ${req.params.id} not found.`)
    }
    const ret = {profile_picture: user.profile_picture}
    res.status(200).json(ret)
})

// @desc    Get users with highest karma
// @route   GET /api/v1/user/top/karma/:userlimit
// @access  Public
const apiGetTopKarmaUsers = asyncHandler(async(req, res, next) => {
    const max_users = req.params.limit;
    if (max_users === 0){
        res.status(204).json({message: "Max users was set to 0, nothing to return."})
    }
    const users = await User.find().sort({karma: -1}).limit(max_users)
    if (!users){
        res.status(204).json({message: "No users found."})
    }
    res.status(200).json(users)
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '90d' })
}

module.exports = {
    apiRegisterUser,
    apiDeleteUser,
    apiGetMe, apiGetUsers, apiGetUser, apiGetProfilePicture,
    apiUpdateUser, apiAuthUser,
    apiGetTopKarmaUsers
}