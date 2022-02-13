const express = require('express')
const {
    apiRegisterUser, 
    apiUpdateUser, 
    apiGetMe, apiGetUsers,
    apiDeleteUser, apiAuthUser
} = require('./users.controller')

const router = express.Router()
const protect = require('../../middleware/authMiddleware')

router.route("/")
    .get(apiGetUsers)
    .post(apiRegisterUser)

router.route("/login")
    .post(apiAuthUser)

router.route("/me")
    .get(protect, apiGetMe) // protect is middleware the requires a JWT auth token

router.route("/:id")
    .put(apiUpdateUser)
    .delete(apiDeleteUser)


module.exports = router;