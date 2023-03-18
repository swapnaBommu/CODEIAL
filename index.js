//Require the express
const express = require('express');
//require the cookie parser
const cookieParser = require('cookie-parser');
//require the express ejs layouts
//creting app for express
const app = express();
//setting the port on which app needs to be run
const port = 8000;
const expresslayouts = require('express-ejs-layouts');
//required the db
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');
//require the connect-flash library
const flash = require('connect-flash');
//require the middleware created by us
const customMware = require('./config/middleware');

//use the data getting from post method
app.use(express.urlencoded()); 
//setting up the cookie parser
app.use(cookieParser());

app.use(express.static('assets'));
//make the upload path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

// use the express layouts before the routes are used because the routes will
//load the ejs files in browser
app.use(expresslayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    //TODO change the secret before deployment in production mode
    secret:'something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
    {
        mongoUrl :'mongodb://127.0.0.1:27017/CODEIAL_development',
        autoRemove: 'disabled',
        ttl:1209600
    }),
    // store: new MongoStore({
    //     url: 'mongodb://127.0.0.1:27017/CODEIAL_development', //YOUR MONGODB URL
    //     ttl: 14 * 24 * 60 * 60,
    //     autoRemove: 'native' 
    // }),
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use the flash library after the session is used
app.use(flash());
//use the custom middleware 
app.use(customMware.setFlash);
//use router
app.use('/',require('./routes/index'));

//use view engine
app.set('view engine','ejs');
app.set('views','./views');



//get response
app.get('/',function(req,res){
    res.send('my first app has started');
});

//starting the server
app.listen(port,function(err){
    if(err){
        console.log(`Error occurred in the starting the server: ${err}`);
    }
    console.log(`the server has started on the port: ${port}`);
});