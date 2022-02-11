const express = require('express')
const {
    apiAddUser, 
    apiUpdateUser, 
    apiGetUser, apiGetUsers,
    apiDeleteUser 
} = require('./users.controller')

const router = express.Router()

router.route("/")
    .get(apiGetUsers)
    .post(apiAddUser)

router.route("/:id")
    .get(apiGetUser)
    .put(apiUpdateUser)
    .delete(apiDeleteUser)


module.exports = router;