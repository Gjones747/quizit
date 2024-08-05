import express from 'express'

// controller imports
const auth = require("./auth/controller")
const user = require('./user/controller')

const router = express.Router()

router.use("/auth", auth)
router.use("/user", user)

module.exports = router