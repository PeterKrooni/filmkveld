const express = require('express')

const {
    apiVoteSeen,
    apiVoteRating,
    apiRemoveVote,
    apiGetVote,
} = require ('./vote.controller')

const router = express.Router()
const protect = require('../../../middleware/authMiddleware')

router.route("/:suggestion")
    .get(protect, apiGetVote)
    .post(protect, apiVoteSeen)
    .put(protect, apiVoteRating)
    .delete(protect, apiRemoveVote)

module.exports = router;