import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

import { getUserFromEmail } from '../controllers/user/db/user'
import { loginRequst, userEncodedInfo, userInfo } from '../models/authModels'

async function validatePassword(login:loginRequst):Promise<[userEncodedInfo, string, boolean]>{
    const failUser:userEncodedInfo = {userId: 0, username: '', email: ''}

    try {
        const user:userInfo = await getUserFromEmail(login.email)

        if (await bcrypt.compare(login.password, user.password)) {
            const encodedInfo:userEncodedInfo = {
                userId: user.userId,
                username: user.username,
                email: user.password,
            }
            return [encodedInfo, '', true]
        } else {
            return [failUser, 'incorrect password' ,false]
        }
    } catch {
        return [failUser, "incorrect email", false]
        
    }

    
}

export {
    validatePassword
}