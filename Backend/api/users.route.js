import express from 'express'
import UsersCtrl from './users.controller.js'

const router = express.Router()

router.route("/").get(UsersCtrl.apiGetUsers)

export default router