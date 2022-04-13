const express = require('express')
const {
    apiRegisterUser, 
    apiUpdateUser, 
    apiGetMe, apiGetUsers, apiGetUser, apiGetProfilePicture,
    apiDeleteUser, apiAuthUser
} = require('./users.controller')

const router = express.Router()
const protect = require('../../../middleware/authMiddleware')

router.route("/")
    .get(protect, apiGetUsers)
    .post(apiRegisterUser)

router.route("/login")
    .post(apiAuthUser)

router.route("/me")
    .get(protect, apiGetMe) // protect is middleware the requires a JWT auth token

router.route("/:id")
    .put(protect, apiUpdateUser)
    .delete(protect, apiDeleteUser)
    .get(protect, apiGetUser)

// because profile pictures are stored as b64 dump of the image, I separated profile pictures from just user data,
// as this can help performance by not getting the profile picture unneccesarily
router.route("/:id/avatar")
    .get(protect, apiGetProfilePicture)

module.exports = router;