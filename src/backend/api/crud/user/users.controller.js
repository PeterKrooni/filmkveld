const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../../model/user')

// Image CDN
require('dotenv').config()//{path: `./.env.${process.env.NODE_ENV}`})
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
    const {_id, name, email, profile_picture, karma, settings, discord_user} = await User.findById(req.user.id) // user.id from auth middleware
    res.status(200).json({
        id: _id,
        name: name,
        email: email,
        profile_picture: profile_picture,
        karma: karma,
        settings: settings,
        discord_user: discord_user
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

// @desc    Logs in using Discord. If no account with the specific Discord ID is found, a pseudo account will be 
//          created for the user (no password or email, logins will check for discord_user flag, and if true, will disallow password authentication) 
// @params  required: discord user id, username, profile_picture
// @route   POST /api/v1/user/discord
// @access  Public
const apiLoginDiscord = asyncHandler(async(req, res, next) => {
    if (!req.body.discord_id){
        return res.status(400).err("Missing Discord id in apiLoginDiscord.")    
    }
    const discord_user = {
        is_discord_user: true,
        discord_id: req.body.discord_id
    }
    
    const existingUser = await User.findOne({discord_user: discord_user})
    if (existingUser){
        return res.status(200).json({
            _id: existingUser.id,
            name: existingUser.name,
            email: 'Unavailable',
            discord_user: existingUser.discord_user,
            token: generateToken(existingUser.id)
        })
    } else {
        const newUser = await User.create({
            name: req.body.name,
            password: 'dummy',
            email: req.body.email ? req.body.email : "none",
            profile_picture: req.body.profile_picture,
            discord_user: discord_user
        })
        if (newUser) {
            return res.status(200).json({
                _id: newUser.id,
                name: newUser.name,
                email: 'Unavailable',
                token: generateToken(newUser.id),
                discord_user: newUser.discord_user
            })
        } else {
            return res.status(500).err("Failed to create user account for Discord user.")
        }
    }
})

// @desc    Gets profile picture and name from Discord API, updates FK user
// @params  old_discord_user: old discord user information, new_discord_user: discord user information fetched from Discord API
// @route   PUT /api/v1/user/discord/
// @access  Private
const apiSynchronizeUserWithDiscord = asyncHandler(async(req, res, next) => {
    if (!req.body.old_discord_user){
        return res.status(400).err("Missing old discord user info to update user.")
    }
    if (!req.body.new_discord_user){
        return res.status(400).err("Missing new discord user info to update user.")
    }
    if (!req.user.id){
        return res.status(400).err("Missing FK user id to synchronize user with Discord.")
    }

    // Verify user authenticity 
    const FKUser = await User.findById(req.user.id)
    if (!FKUser){
        return res.status(500).err(`Unable to find FK user with id: ${req.user.id}`)
    }

    if (FKUser._id.toString() !== req.user.id){
        console.error("FK user id authentication error.s", FKUser._id.toString(), req.user.id)
        return res.status(401).err(`FK User id was not same as JWT id.`)
    }
    
    const new_user = {
        username: req.body.new_discord_user.username, 
        profile_picture: req.body.new_discord_user.profile_picture,
    }
    const updatedUser = await User.findByIdAndUpdate(req.body.old_discord_user.userid, {name: new_user.username, profile_picture: new_user.profile_picture})
    if (!updatedUser){
        return res.status(500).err("Failed to synchronize user with Discord.")
    }
    return res.status(200).json(updatedUser)
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
        karma: user.karma,
        discord_user: user.discord_user
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
    apiRegisterUser, apiLoginDiscord, apiSynchronizeUserWithDiscord,
    apiDeleteUser,
    apiGetMe, apiGetUsers, apiGetUser, apiGetProfilePicture,
    apiUpdateUser, apiAuthUser,
    apiGetTopKarmaUsers
}