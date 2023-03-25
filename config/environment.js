const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream = rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
});



const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'something',
    db: 'CODEIAL_development',
    smtp: {
            service:'gmail',
            host:'smpt.gmail.com',
            port:587,
            secure:false,
            auth:{
                user:'test123', //add ur mail
                pass:   'Test@1234' //password
            }
        },
        google_client_id:"11373170113-vvehehthnngvpivbfiafrvqktdhn36e1.apps.googleusercontent.com",
        google_client_secret:"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",
        google_call_back_url:"http://localhost:8000/users/auth/google/callback",
        jwt_secret : 'codeial',
        morgan: {
            mode:'dev',
            options:{ stream: accessLogStream}
        }

}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
            service:'gmail',
            host:'smpt.gmail.com',
            port:587,
            secure:false,
            auth:{
                user:process.env.CODEIAL_GMAIL_USERNAME, //add ur mail
                pass:  process.env.CODEIAL_GMAIL_PASSWORD //password
            }
        },
        google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
        google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
        google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
        jwt_secret : process.env.CODEIAL_JWT_SECRET,
        morgan: {
            mode:'combined',
            options:{ stream: accessLogStream}
        }

}

module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);