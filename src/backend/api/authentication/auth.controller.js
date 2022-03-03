const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')


// @desc    Check if user is logged in
// @route   POST /api/v1/auth/
// @access  Private
const apiVerifyAuthToken = asyncHandler(async(req, res, next) => {
    const token = req.body.token;
    try {
        jwt.verify(token, process.env.JWT_SECRET)
        return true;
    } catch {
        return false
    }
})

module.exports = {
    apiVerifyAuthToken
}