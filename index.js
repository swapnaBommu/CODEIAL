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

//use the data getting from post method
app.use(express.urlencoded()); 
//setting up the cookie parser
app.use(cookieParser());

app.use(express.static('assets'));

// use the express layouts before the routes are used because the routes will
//load the ejs files in browser
app.use(expresslayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

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