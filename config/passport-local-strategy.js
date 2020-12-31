const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/signup');

//authentication using passport 
passport.use(new LocalStrategy({
        usernameField:'email',
        passReqToCallback: true
    },
    function(req,email,password,done){
        //find a user and establish the identity
        User.findOne({email: email}, function(err,user){
            if(err){
                req.flash('error',err);
                return done(err);
            }
            if(!user || user.password != password){
                req.flash('error','invalid Username/password');
                return done(null,false);
            }
            return done(null,user);
        });
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user){
         if(err){
             console.log('error in finding user');
         }
         return done(null,user);
    });
});
// check user is authenticated
passport.checkAuthentication=function(req,res,next){
  //if the user is signed in , then pass on the request to the next function(controller's action)

    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/signin');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookies and we are just sending this to locals for the use
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport;