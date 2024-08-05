import mysql from "mysql2"
import dotenv from "dotenv"
import bcrypt from 'bcrypt'

import { loginRequst, refreshResponse, userInfo } from "../../models/authModels"

dotenv.config();

const pool = mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
}).promise()


const getRefreshDB = async (userId:number, token:string) => {
    const [refreshResponse] = await pool.query(`SELECT * from RefreshTokens WHERE user_id = ? AND refresh_token = ?`, [userId, token]);
    console.log(refreshResponse)
}

async function deleteRefresh(user_id:Number) {
    await pool.query(`
    DELETE FROM RefreshTokens WHERE user_id = ?
    `, [user_id])
}

async function storeRefreshKey(userId:Number, refresh_token:string) {
    // unique value needs to make sure there isn't already a refresh token
    deleteRefresh(userId);

    // stores a new token in storage with valid until date should be 5 days in the future
    // note that JS date function starts at 0 so 0 is january womp womp
    const date:Date = new Date()
    date.setDate(date.getDate() + 5)

    const dateString:string = '' + date.getFullYear() +'-' + date.getMonth() +"-"+ date.getDate();
    await pool.query(`
    INSERT into RefreshTokens (user_id, valid_until, refresh_token)
    VALUES (?, ?, ?)
    `, [userId, dateString, refresh_token])
}


export {
    getRefreshDB,
    storeRefreshKey
}