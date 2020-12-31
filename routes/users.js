const express = require('express');

const router=express.Router();
const passport=require('passport');
const homeController=require('../controllers/home_controller');
const usersController=require('../controllers/users_controller');
//router.get('/click',usersController.click);
router.get('/profile/:id',usersController.profile);
router.post('/update/:id',passport.checkAuthentication, usersController.update);
router.get('/auth/google',passport.authenticate('google',{scope: ['profile' , 'email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/signin'}),homeController.createSession);
module.exports=router;