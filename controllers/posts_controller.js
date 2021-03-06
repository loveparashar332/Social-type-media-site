const Post=require('../models/post');
// const Comment = require('../models/comment');
// const PostMailer=require('../mailers/comments_mailer');
const Like=require('../models/like');

module.exports.create=async function(req,res){
    try{
        let post=await Post.create({
            content: req.body.content,
            user: req.user._id
          });
        post= await post.populate('user','name email').execPopulate();
        // PostMailer.newPost(post);
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: post
                },
                message:"post created!"
            })
        }
            req.flash('success','Post published!');
            return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}
module.exports.destroy =async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        if(post.user == req.user.id)
            {

               //CHNAGE:: delete the associated likes for the post and all its comment's likes too
               await Like.deleteMany({likeable: post, onModel: 'Post'});
               await Like.deleteMany({_id: {$in: post.comments}});
               post.remove();
               
               await Comment.deleteMany({post: req.params.id});
               if(req.xhr){
                   return res.status(200).json({
                       data: {
                           post_id: req.params.id
                       },
                       message: 'post deleted successfully!!'
                   })
               }
               req.flash('success','Post and associated commments are deleted!');
               return res.redirect('back');
            }
            else{
                req.flash('error','U cannot delete post');
                return res.redirect('back');
            }
    }catch(err){
        req.flash('error',err);
        return redirect('back');
    
    }
}