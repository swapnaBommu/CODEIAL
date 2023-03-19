const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//tell passport to use a strategy for google login
passport.use(new googleStrategy({
        clientID:"11373170113-vvehehthnngvpivbfiafrvqktdhn36e1.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
        //find a user
        User.findOne({email:profile.emails[0].value}).
        then(user =>{
            console.log(profile);
            if(user){
                //if found set this user as req.user
                return done(null,user);
            }else{
                //if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex') 
                })
                .then(user =>{
                    return done(null, user);
                })
                .catch(err =>{
                    console.log("Error in creating user google strategy passport",err);
                })
            }

        }).catch(err=>{
            console.log("Error in google strategy passport",err);
        })
    }
));

module.exports = passport;