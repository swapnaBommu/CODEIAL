const Posts = require('../models/post');

module.exports.home = function(req,res){

    // Posts.find({}).then(posts =>{
    //     return res.render('home',{
    //         title:"Codeial | Home",
    //         posts : posts
    //     });
    // });

    //populate the user of each post
    Posts.find({}).populate('user').then(posts =>{
        return res.render('home',{
            title:"Codeial | Home",
            posts : posts
        });
    })


};


module.exports.home2 = function(req,res){
    return res.send('<P>This is second home controlser</p>');
};