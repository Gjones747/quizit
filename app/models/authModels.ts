// models for endpoint requests/responses
interface tokenResponse {
    token:string;
    refreshToken:string
}

interface loginRequst {
    email:string,
    password:string,
}



// models for future db

interface userAuthInfo {
    userId:string;
    username:string;
    email:string;
    password:string;
}



// models for jwt creation

interface userEncodedInfo {
    userId:string,
    username:string
}


export {
    loginRequst,
    tokenResponse,
    userAuthInfo,
    userEncodedInfo,
}