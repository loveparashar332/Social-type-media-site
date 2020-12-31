const User=require('../models/signup');
const fs= require('fs');
const path = require('path');
const post=require('../models/post');
module.exports.profile=async function(req,res){
    console.log('profile is called');
    let users=await User.find({});
    
   User.findById(req.params.id, function(err, user){
    return res.render('user_profile',{
        title: 'User Profile',
        profile_user: user,
        all_users : users,
    });
   });
    
}
/*module.exports.click=async function(req,res){
    try{
        let addItem=0;
        let posts=await post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate: {
                path:'user'
            }
        });
        let users=await User.find({});
        return res.render('home',{
            title:'Codeial | Home',
            posts: posts,
            all_users: users,
            count: 1
        });
      }catch(err){
          console.log('Error',err);
      }
}*/
module.exports.update=async function(req,res){
   /* if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body,function(err,user){
            req.flash('success', 'Updated!!');
            return res.redirect('back');
        });
    }
    else{
        return res.status(401).send('Unauthorized');
    }*/

    if(req.user.id == req.params.id){
           try{
              let user= await User.findById(req.params.id);
              User.uploadedAvatar(req, res, function(err){
                  if(err){
                      console.log('*********Multer Error',err);
                  }
                  user.name = req.body.name;
                  user.email = req.body.email;
                  if(req.file){
                      if(user.avatar){
                           fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                      }
                      //this is saving the path of uploaded file into the avatar field in the user 
                      user.avatar = User.avatarPath + '/' + req.file.filename;
                  }
                  user.save();
                  return res.redirect('back');
              });
           }catch(err){
               req.flash('error is found!!',err);
               return res.redirect('back');
           }
    }else{
        return res.status(401).send('Unauthorized');
    }
}
