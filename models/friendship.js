const mongoose=require('mongoose');

const friendShipSchema = new mongoose.Schema({
    // the user who sent this request
    from_user:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Signup'
    },
    // the user who accepted the request, the naming is just to undertand
    to_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Signup'
    }
},{
      timestamps: true
    
})
const Friendship= mongoose.model('Friendship',friendShipSchema);
module.exports=Friendship;