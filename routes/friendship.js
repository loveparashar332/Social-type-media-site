const express=require('express');
const friendcontroller=require('../controllers/friendship_controller');
const router=express.Router();

router.get('/addorremove',friendcontroller.create);
module.exports=router;