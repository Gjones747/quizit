import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

import { createUser } from '../../../db/user/user'

import { loginRequst, tokenResponse, userEncodedInfo, userCreateInfo } from '../../../models/authModels'

const router = express.Router()

const jsonParser = bodyParser.json()

router.get("/", (req, res) => {
    res.send("made it to auth")
})

router.post("/signup", async (req:Request, res:Response) => {
    const userInfo:userCreateInfo = req.body;


    try {
        await createUser(userInfo);
        res.sendStatus(201)
    } catch (err) {
        res.sendStatus(409)
    }
})

module.exports = router