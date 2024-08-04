import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

import { createUser } from '../../user/db/user'

import { loginRequst, tokenResponse, userEncodedInfo, userCreateInfo } from '../../../models/authModels'
import { validatePassword } from '../../../auth/validate'
import Token from '../../../auth/token'

const router = express.Router()

const jsonParser = bodyParser.json()


router.post("/login", async (req:Request, res:Response) => {
    const userInfo:loginRequst = req.body;
    try {
        const encodedInfo = await validatePassword(userInfo)

        if (encodedInfo[2]) {
            res.send(Token.createTokenPair(encodedInfo[0]))
        } else {
            res.send(encodedInfo[1])
        }

    } catch (err) {
        console.log(err)
        res.send('incorrect email or password')
    }
})

module.exports = router