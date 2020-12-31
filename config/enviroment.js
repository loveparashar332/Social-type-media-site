const fs= require('fs');
const rfs=require('rotating-file-stream');
const path = require('path');

const logDirectory= path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});
const development={
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    resetpassword:'loveresettingkey3034',
    smtp :{
         service: 'gmail',
         host: 'smtp.gmail.com',
         port: 587,
         secure: false,
         auth: {
             user:'dr.kushparashar1103@gmail.com',
             pass:'DR.KUSH(11032002)BHAI'
       }
    },
    google_client_ID: "729950922281-4u194ono0tj2ul2k89al6oenl6s6np9b.apps.googleusercontent.com",
    google_client_Secret: "IQP5z3QYcLWIRwn86ORSS5Qf",
    google_call_backURL: "http://localhost:8000/users/auth/google/callback",
    jwt_key:'codeial',
    morgan:{
        mode: 'dev',
        options:{stream: accessLogStream}
    }
}
const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    resetpassword:process.env.RESET_PASSWORD_KEY,
    smtp :{
         service: 'gmail',
         host: 'smtp.gmail.com',
         port: 587,
         secure: false,
         auth: {
             user: process.env.CODEIAL_USER_EMAIL,
             pass: process.env.CODEIAL_PASSWORD
       }
    },
    google_client_ID: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_Secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_backURL: process.env.CODEIAL_GOOGLE_CALL_BACKURL,
    jwt_key: process.env.CODEIAL_JWT_KEY,
    morgan:{
        mode: 'combined',
        options:{stream: accessLogStream}
    }
}
module.exports = eval(process.env.CODEIAL_ENVIROMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIROMENT);
