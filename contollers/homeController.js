const Post = require('../models/post');

module.exports.home = function(req,res){
     // console.log(req.cookies);
    // res.cookie('user_id', 25);   

    // Posts.find({}).then(posts =>{
    //     return res.render('home',{
    //         title:"Codeial | Home",
    //         posts : posts
    //     });
    // });

    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .then(posts =>{
        return res.render('home',{
            title:"Codeial | Home",
            posts : posts
        });
    })


};


module.exports.home2 = function(req,res){
    return res.send('<P>This is second home controlser</p>');
};