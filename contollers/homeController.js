const Post = require('../models/post');
const User = require('../models/user');
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
        User.find({}).then(users =>{
            return res.render('home',{
                title:"Codeial | Home",
                posts : posts,  
                all_users : users
            });
        });
        
    })


};


module.exports.home2 = function(req,res){
    return res.send('<P>This is second home controlser</p>');
};