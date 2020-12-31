const User=require('../../../models/signup');
const jwt=require('jsonwebtoken');
const env =require('../../../config/enviroment');

module.exports.createSession=async function(req,res){
 try{
    let user=await User.findOne({email: req.body.email});
    if(!user || user.password != req.body.password){
        return res.json(422,{
            message: 'invalid username or password'
        })
    }
    return res.json(200,{
        message: 'sign in successfully,here is your token please keep it safe!!',
        data: {
            token: jwt.sign(user.toJSON(),env.jwt_key, {expiresIn: '100000'})
        }
    });
 }catch(err){
       return res.json(500,
        {
            message : "Internal server error"
        });
 }
   
    
}