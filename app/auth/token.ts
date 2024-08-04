require("dotenv").config()
const jwt = require('jsonwebtoken')
import express, { Request, Response, NextFunction } from "express";
import {  tokenResponse, userEncodedInfo } from "../models/authModels";
import { getRefreshDB } from "../controllers/auth/db/token";

const TOKEN_SETTINGS:{} = {expiresIn: '20s'}

const Token = {
    createTokenPair: function (userInfo:userEncodedInfo):tokenResponse {

        const token = jwt.sign(userInfo, process.env.PRIMARY_GEN_KEY,TOKEN_SETTINGS)

        // should be stored on db to make sure refresh token is valid
        const refresh = jwt.sign(userInfo, process.env.REFRESH_GEN_KEY)

        const response:tokenResponse = {
            token: token,
            refreshToken: refresh,
        }

        return response;
        
    },

    refreshToken: function(refreshToken:string):tokenResponse | Error {
        //TODO needs to check if token is a valid refresh token in db

        

        // if it is return a new token response
        const response = jwt.verify(refreshToken, process.env.REFRESH_GEN_KEY, (err:Error, user:userEncodedInfo) => {
            const userInfo:userEncodedInfo = {
                userId: user.userId,
                email: user.email,
                username: user.username
            }
            const newToken = jwt.sign(userInfo, process.env.PRIMARY_GEN_KEY, TOKEN_SETTINGS);
            
            //TODO should new refresh token be made and old deleted everytime it is used

            return {
                token: newToken,
                refreshToken: refreshToken
            }
        })

        return response;

    },

    authenticateToken: function authenticateToken(req:Request, res:Response, next:NextFunction) {
        const requestHeader = req.headers['authorization']
        const token = requestHeader && requestHeader.split(" ")[1]

        if (token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.PRIMARY_GEN_KEY, (err:Error, user:userEncodedInfo) => {
            if (err) return res.sendStatus(401);

            req.body.user = user;
            next()
        })
    }
}


export default Token