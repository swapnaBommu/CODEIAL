//Require the express
const express = require('express');
//setting the port on which app needs to be run
const port = 8000;

//creting app for express
const app = express();

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