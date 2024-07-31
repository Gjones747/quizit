import express from 'express'
const jwt = require("./routes/TokenEndpoints")

const router = express.Router();

router.use("/", jwt)


module.exports = router