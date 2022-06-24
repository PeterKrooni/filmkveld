const jwt = require('jsonwebtoken')
const User = require('../model/user')
const asyncHandler = require('express-async-handler')

// verifies header token, adds user to header
const protect = asyncHandler (async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (e){
            console.error(e)
            return res.status(401).err('Not authorized.')
        }
    }

    if(!token){
        return res.status(401).err('No authorization token.')
    }
})

module.exports = protect