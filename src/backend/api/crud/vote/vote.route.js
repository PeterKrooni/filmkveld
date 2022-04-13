const express = require('express')

const {
    apiVoteSuggestion,
    apiRemoveVote,
    apiGetVote,
    apiUpdateVote
} = require ('./vote.controller')

const router = express.Router()
const protect = require('../../../middleware/authMiddleware')

router.route("/:suggestion")
    .get(protect, apiGetVote)
    .post(protect, apiVoteSuggestion)
    .put(protect, apiUpdateVote)
    .delete(protect, apiRemoveVote)

module.exports = router;