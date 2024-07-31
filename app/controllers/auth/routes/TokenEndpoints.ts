import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

import { loginRequst, tokenResponse, userEncodedInfo } from '../../../models/authModels'

const router = express.Router()

const jsonParser = bodyParser.json()

router.get("/", (req, res) => {
    res.send("made it to auth")
})

module.exports = router