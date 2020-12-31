const Like=require('../models/like');
const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.toggleLike = async function(req, res){
    try{
          //likes/toggle/?id=abcdef& type=Post
          let likeable;
          let deleted = false;
          

          if(req.query.type=='Post'){
               likeable=await Post.findById(req.query.id).populate('likes');

          }else{
               likeable= await Comment.findById(req.query.id).populate('likes');

          }

          //check if a like already exist
          let existinglike = await Like.findOne({
              likeable: req.query.id,
              onModel: req.query.type,
              user: req.user._id
          });
          // if a like already exist then delete it
          if(existinglike){
                likeable.likes.pull(existinglike._id);
                likeable.save();
                existinglike.remove();
                deleted=true;
          }else{
              // else make a like
              let newLike=await Like.create({
                  user: req.user._id,
                  likeable: req.query.id,
                  onModel: req.query.type
              });
              likeable.likes.push(newLike._id);
              likeable.save();
          }
          
          return res.status(200).json({
              message: "request successful",
              data: {
                  deleted: deleted
              }
          });
    }catch(err){
        //console.log(err);
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR"
        });
    }
}