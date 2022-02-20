const express = require('express')

const {
    // apiAddVote etc.
} = require ('./vote.controller')

const router = express.Router()
const protect = require('../../middleware/authMiddleware')

router.route("/")

module.exports = router;