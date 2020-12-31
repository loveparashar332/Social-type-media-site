const mongoose= require('mongoose');
const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    // comment belongs to user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Signup'
    },
    // it will be accesed by the post 
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref: 'Like'
        }
      ]
},{
    timestamps:true
});
const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;