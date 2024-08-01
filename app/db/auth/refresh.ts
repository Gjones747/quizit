import mysql from "mysql2"
import dotenv from "dotenv"

import { refreshResponse } from "../../models/authModels"

dotenv.config();

const pool = mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
}).promise()


const checkRefreshDB = async (userId:number, token:string) => {
    const [refreshResponse] = await pool.query(`SELECT * from RefreshTokens WHERE user_id = ? AND refresh_token = ?`, [userId, token]);

    console.log(refreshResponse)

}




export {
    checkRefreshDB,

}