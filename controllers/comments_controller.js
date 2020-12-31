const Comment=require('../models/comment');
const Post=require('../models/post');
const commentMailer=require('../mailers/comments_mailer');
const queue=require('../config/kue');
const commentemailworker=require('../workers/comment_email_worker');
const Like=require('../models/like');
module.exports.create=async function(req,res){
     try{
        let post=await Post.findById(req.body.post);
        if(post){
           let comment=await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
                 //handle error 
                 post.comments.push(comment);
                 post.save();
                 comment= await comment.populate('user','name email').execPopulate();
                // commentMailer.newComment(comment);
                //pushing the jobs into the queue,either it will make queue or will push jobs into it
                let job = queue.create('emails',comment).save(function(err){
                    if(err){
                        console.log('Error in sending to the queue',err);
                       return;
                    }
                    console.log('job enqueued',job.id);
                });
                 if(req.xhr){
                     return res.status(200).json({
                         data:{
                             comment: comment
                         },
                         message: 'post created!!'
                     })
                 }
                 req.flash('success','Comment Created!!');
                 res.redirect('back');
        }
     }catch(err){
         console.log('Error',err);
     }
}
module.exports.destroy=async function(req,res){
    try{
        let comment= await Comment.findById(req.params.id); 
        if(comment.user == req.user.id){
               let postId=comment.post;
               comment.remove();
               await Post.findByIdAndUpdate(postId,{
                   $pull:{comments:req.params.id}
               });

               await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
               return res.redirect('back');
               
        }
        else{
            return res.redirect('back');
           }
    }catch(err){
         console.log('Error',err);
    }
     
     
}