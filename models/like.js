const mongoose=require('mongoose');


const likeSchema = new mongoose.Schema({
    user:{
          type: mongoose.Schema.ObjectId,
          ref: 'Signup'
    },
    // we are going to use the dynamic reference of object
    //this defines object id of liked of liked object
    likeable:{
         type: mongoose.Schema.ObjectId,
         required: true,
         refPath: 'onModel'
    },
    // this is used for defining the type of liked object since this is a dynamic reference
    onModel:{
        type: String,
        require: true,
        enum: ['Post','Comment']
    }
},{
    timestamps: true
});

const Like=mongoose.model('Like',likeSchema);
module.exports=Like;