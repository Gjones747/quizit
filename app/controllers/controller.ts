import express from 'express'

// controller imports
const auth = require("./auth/controller")

const router = express.Router()

router.use("/auth", auth)

module.exports = router