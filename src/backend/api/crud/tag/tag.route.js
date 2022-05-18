const express = require('express')
const {
    apiGetTags,
    apiGetTag,
    apiAddTag,
    apiRemoveTag,
    apiUpdateTag,
} = require('./tag.controller')

const router = express.Router()
const protect = require('../../../middleware/authMiddleware')

router.route("/")
    .post(protect, apiAddTag)
    .put(protect, apiUpdateTag)
    .get(apiGetTags)

router.route("/:id")
    .get(protect, apiGetTag)
    .delete(protect, apiRemoveTag)

module.exports = router;