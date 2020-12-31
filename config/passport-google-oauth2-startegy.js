const passport=require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User=require('../models/signup');
const env =require('./enviroment');
//tell passport to use strategy for google login
passport.use(new googleStrategy({
    clientID: env.google_client_ID,
    clientSecret: env.google_client_Secret,
    callbackURL: env.google_call_backURL,
 },
   function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google strategy-passport',err);return;}
            console.log(profile);
            if(user){
                // to set req.user
                return done(null,user);
            }else{
                 User.create({
                     name: profile.displayName,
                     email: profile.emails[0].value,
                     password: crypto.randomBytes(20).toString('hex')
                 },function(err,user){
                       if(err){
                           console.log('error in creating google strategy',err);
                           return;
                       }else{
                           return done(null,user);
                       }
                 });
            }
        });
   }
));
module.exports=passport;