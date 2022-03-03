const express = require('express')
const {
    apiVerifyAuthToken,
} = require('./auth.controller')

const router = express.Router()

router.route("/")
    .post(apiVerifyAuthToken)

module.exports = router;