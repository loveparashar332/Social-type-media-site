const User=require('../models/signup');
const post=require('../models/post');
const forgot=require('../models/forgot_password');
const Message = require('../models/message');
const jwt = require('jsonwebtoken');
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    // console.log(req.cookies);
    res.cookie('love_parashar',30);
   // return res.end('<h1>Express is up for codeial</h1>');
   return res.render('signup',{
       title:'sign up'
   });
}
module.exports.home=async function(req,res){
 /*  post.find({},function(err,posts){
        return res.render('home',{
           title:'codieal | Home',
           posts:posts
       });
    });*/
  //populate user of each post
  //using async await
  try{
    let posts=await post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate: {
            path:'user'
        },
        populate:{
            path: 'likes'
        }
    }).populate('likes');
    let users=await User.find({});
    return res.render('home',{
        title:'Codeial | Home',
        posts: posts,
        all_users: users,
        count:0
    });
  }catch(err){
      console.log('Error',err);
  }
    

    
}
module.exports.profile=function(req,res){
    console.log('profile is called');
    User.findById(req.params.id, function(err, user){
    return res.render('home',{
        title: 'User Profile',
        profile_user: user,
        count:0
    });
   });
}

/*module.exports.forgotpassword=function(req,res){
    return res.render('fotgot');
}*/
module.exports.forgotpage=function(req,res){
    return res.render('checkemail',{
        title: 'check-email',
    });
}
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
      return  res.redirect('/');
    }
    return res.render('signin',{
        title:'signin',
    });
}

/*module.exports.createpassword=async function(req,res){
    try{
        console.log(req.params.id);
        let user=await findById(req.params.id);
        user.password = req.body.password;
    }catch(err){
        console.log(err);
    }
    
    



    /*if(req.body.password!= req.body.confirm_password){
        req.flash('success','password did not match');
        return res.redirect('back');
    }
    /*else{      
                 findById(req.params.id,function(err,user){
                     if(err){
                         console.log(err);
                         return;
                     }
                     if(user){
                         password=req.body.password;
                         return res.redirect('back');
                     }
                 }
                 );*/
                /* user.password = req.body.password;
                 return res.redirect('/signin');*/
             
       // }
        
    

/*module.exports.checkemail = function(req,res){
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding user',err);
            return;
        }
        if(!user){
            req.flash('success','Invalid email');
            return res.redirect('back');
        }
        
            return res.render('fotgot',{
                title: 'happy',
                user_found: user
            });
        
    })
}

*/
module.exports.score=function(req,res){
    return res.end('<h1>200 vs wi,140 vs aus,130 vs nz');
}
module.exports.create=function(req,res){
    //  return res.end('hii I am very good in cricket****');
     if(req.body.password!=req.body.confirm_password)
           return res.redirect('back');
    User.findOne({email: req.body.email},function(err,user){
          if(err){ 
             console.log("err",err); 
          }     
          if(!user){
              User.create(req.body, function(err,user){
                  if(err){console.log('error in signup',err)};
                  console.log(req.body);
                  return res.redirect('/signin');
              });
            }   
          else{
              return res.redirect('back'); 
             } 
    });
}
module.exports.createSession=function(req,res){
      req.flash('success','Logged in Successfully');
      return res.redirect('/');
}
module.exports.destroySession=function(req,res){
      req.logout();
      req.flash('success','Signed out Successfully');
      return res.redirect('/signup');
}
module.exports.createmessage = function(req,res){
    Message.create(req.body,function(err,mssg){
          if(err)
          {
              console.log('error in creting message',err);
          }
          else{
              console.log('message is ',mssg);
        }
    })
}
  