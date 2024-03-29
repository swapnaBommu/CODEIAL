const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env = require('./environment');
const User = require('../models/user');

let opts = {
    jwtFromRequest :ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.jwt_secret

} 

passport.use(new JWTStrategy(opts,function(jwtpayLoad,done){
    User.findById(jwtpayLoad._id).then(user =>{
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    }).catch(err =>{
        console.log('Error in finding the user from jwt',err);
            return;
    });   
}));

module.exports = passport;