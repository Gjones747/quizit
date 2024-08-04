import mysql, { RowDataPacket } from "mysql2"


// models for endpoint requests/responses
interface tokenResponse {
    token:string;
    refreshToken:string
}

interface loginRequst {
    email:string,
    password:string,
}



// info sent in the create account post request
interface userCreateInfo {
    username:string;
    email:string;
    password:string;
}



// models for future db

interface refreshResponse {
    id:number,
    userId:number,
    refreshToken:string,
}

interface userInfo extends RowDataPacket {
    userId:number;
    username:string;
    email:string;
    password:string;
}



// models for jwt creation

// this is the info stored in the user token
interface userEncodedInfo {
    username:string;
    email:string;
    userId:number; 
}


export {
    loginRequst,
    userCreateInfo,
    tokenResponse,
    userInfo,
    userEncodedInfo,
    refreshResponse,
}