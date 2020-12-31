const mongoose= require('mongoose');
const accesstokenschema= new mongoose.Schema({
     user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Signup'
      },
     accesstoken: {
         type: String,
         value: "yes"
     },
     isvalid: {
         type: Boolean,
         
     }
    },
    {

      timestamps:true

});
const Forgot=mongoose.model('forgot',accesstokenschema);
module.exports=Forgot;