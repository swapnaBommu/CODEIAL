//Require the express
const express = require('express');
//setting the port on which app needs to be run
const port = 8000;
//require the express ejs layouts
const expresslayouts = require('express-ejs-layouts');


//creting app for express
const app = express();

// use the express layouts before the routes are used because the routes will
//load the ejs files in browser
app.use(expresslayouts);
app.use(express.static('assets'));

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use view engine
app.set('view engine','ejs');
app.set('views','./views');

//use router
app.use('/',require('./routes/index'));




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