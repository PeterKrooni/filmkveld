const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')


// @desc    Check if user is logged in
// @route   POST /api/v1/auth/
// @access  Private
const apiVerifyAuthToken = asyncHandler(async(req, res, next) => {
    const token = req.body.token;
    try {
        jwt.verify(token, process.env.JWT_SECRET)
        return res.status(200).json(true);
    } catch {
        return res.status(401).json(false)
    }
})

module.exports = {
    apiVerifyAuthToken
}