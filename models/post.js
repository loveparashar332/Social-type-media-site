const mongoose=require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Signup'
    },
    // include the array of ids of all comments into this post schema itself
    comments:[
           {
                 type: mongoose.Schema.Types.ObjectId,
                 ref: 'Comment'
           }
        ],
  likes:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Like'
    }
  ]
},{
     timestamps: true
});
const Post=mongoose.model('Post',postSchema);
module.exports=Post;