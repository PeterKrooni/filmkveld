const express = require('express')
const {
    apiRegisterUser, 
    apiUpdateUser, 
    apiGetMe, apiGetUsers, apiGetUser,
    apiDeleteUser, apiAuthUser
} = require('./users.controller')

const router = express.Router()
const protect = require('../../middleware/authMiddleware')

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


module.exports = router;