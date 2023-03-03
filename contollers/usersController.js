//requiring user model
const User = require('../models/user');

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id)
        .then( user => {
            if(user){
                return res.render('user_profile',{
                    title: "user profile",
                    user:user
                });
            }else{
                return res.redirect('/users/sign-in');
            }
            
        })
       
    }else{
        return res.redirect('/users/sign-in');
    }
   
};
module.exports.name = function(req,res){
    return res.end("<h1>USERS name</h1>");
};

//render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:"Codeial | signup"
    });
};
//render the sign in page
module.exports.signIn= function(req,res){
    return res.render('user_sign_in',{
        title:"Codeial | signin"
    });
};

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}).then(user => {
        if (!user)
        {
            User.create(req.body).then(user1 =>{
                return res.redirect('/users/sign-in');
            })
            .catch( err => {
                console.log('error in creating user while signing up'); 
                return;
            })
       
        }
        else{
            return res.redirect('back');
        }
    })
    .catch(err =>{
        console.log('error in finding user in signing up'); 
        return;
    });
}


//sign in and create a session for user
module.exports.createSession = function(req,res){
    //find the user
    User.findOne({email: req.body.email}).then(user => {
        //handle user found
        if (user)
        {
            //handle password which doesn't match
            if(user.password != req.body.password)
            {
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }else{
             //handle user not found
             return res.redirect('back');
        }
    })
    .catch( err => {
        console.log('error in creating user while signing in'); 
        return;
    });
       
}
   
