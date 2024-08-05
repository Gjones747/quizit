import mysql from "mysql2"
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { userCreateInfo, userEncodedInfo, userInfo } from "../../models/authModels";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
}).promise()



const createUser = async (newUser:userCreateInfo) => {
    // validate that info exists 
    const hashPassword = await bcrypt.hash(newUser.password, 14)
    await pool.query(`
    INSERT into Users (username, email, password)
    VALUES (?, ?, ?)
    `, [newUser.username, newUser.email, hashPassword])
    
}

async function getUserFromEmail(email:string):Promise<userInfo> {
    const [user] = await pool.query<userInfo[]>('SELECT * from Users WHERE email = ?', [email])

    return user[0]
}




export {
    createUser,
    getUserFromEmail,
}





