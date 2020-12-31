const friend=require('../models/friendship');
const User=require('../models/signup');

module.exports.create= async function(req,res){
       try{
             let added= true;
             console.log(req.user.id);
             let friends;
             let user=await User.findById(req.user._id).populate('friendships');
             //let profile_user=await User.findById(req.query.id);
             let checkfriend=await friend.findOne({
                    from_user:req.user._id,
                    to_user:req.query.id
             });
            if(checkfriend){
                  user.friendships.pull(checkfriend._id);
                  user.save();
                  checkfriend.remove();
                  added = false;
            }else{
               friends=await friend.create({
                from_user: req.user._id,
                to_user: req.query.id
               });
               user.friendships.push(friends._id);
               user.save();
            }
            //friends = await friends.populate('to_user', 'name email').execPopulate();
           // console.log(friends.to_user.name);
            return res.status(200).json({
                message: "request successfully sent",
                data:{
                     added : added
                }
            });
       }catch(err){
             return res.status(500).json({
                 message: "error!!! in creating friendship"
             });
       }
}