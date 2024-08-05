import express from 'express'
const account = require("./routes/Account")

const router = express.Router();

router.use("/", account)


module.exports = router