const mongoose=require('mongoose');
const multer = require('multer');
const path = require('path');
const { stringify } = require('querystring');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const signSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type: String
    },
    resetLink: {
          data:String,
          default: ''
    }
}, {
    timestamps:true
});
let storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, path.join(__dirname, '..',AVATAR_PATH));
    },
    filename: function(req, file , cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
// static function
signSchema.statics.uploadedAvatar = multer({ storage: storage}).single('avatar');
signSchema.statics.avatarPath = AVATAR_PATH;
const Signup=mongoose.model('Signup',signSchema);
module.exports=Signup;
