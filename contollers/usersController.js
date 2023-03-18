//requiring user model
const User = require('../models/user');

module.exports.profile = function(req,res){
    User.findById(req.params.id).then(user =>{
        return res.render('user_profile',{
            title:"Users",
            profile_user:user
        });
    })
    
};

//update user information
module.exports.update =async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body).then(user =>{
    //  req.flash('success','updated details');
    //         return res.redirect('back');
    //     })
    // }else{
    //      req.flash('error','unauthorized');
    //     return res.status(401).send('Unauthorized');
    // }
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('*******multer error: ',err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err ){
            req.flash('error',err);
            return res.redirect('back');
        }





     }else{
          req.flash('error','unauthorized');
         return res.status(401).send('Unauthorized');
     }
}


//render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"Codeial | signup"
    });
};
//render the sign in page
module.exports.signIn= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
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
    });
            
   
}
// , function(err, user){
//     if(err){console.log('error in finding user in signing up'); return}

//     if (!user){
//         User.create(req.body, function(err, user){
//             if(err){console.log('error in creating user while signing up'); return}

//             return res.redirect('/users/sign-in');
//         })
//     }else{
//         return res.redirect('back');
//     }

//sign in and create a session for user
module.exports.createSession = function(req,res){
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res,next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
    });
    req.flash('success','Logged out successfully');

    return res.redirect('/');
}