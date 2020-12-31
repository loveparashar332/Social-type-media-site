const express=require('express');
const router=express.Router();
const passport=require('passport');

const homeController=require('../controllers/home_controller');
console.log('router loaded');

const usersController=require('../controllers/users_controller');
router.get('/profile/:id',passport.checkAuthentication, homeController.profile);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));

//router.get('/change',homeController.forgotpassword);
//router.post('/check-forgotpassword/:id',homeController.createpassword);
//router.post('/check-email',homeController.checkemail);
router.get('/',passport.checkAuthentication,homeController.home);
router.use('/friend',require('./friendship'));
router.use('/likes',require('./likes'));
router.get('/signup',homeController.signup);
router.post('/createmessage',homeController.createmessage);
//router.get('/forgotpassword',homeController.forgotpage);
router.get('/signin',homeController.signin);
router.post('/create',homeController.create);
router.use('/comments',require('./comments'));
//use passport as a middleware to authenticte
router.post('/createsession',passport.authenticate(
    'local',
    {failureRedirect:'/signin'},
),homeController.createSession);
router.use('/api',require('./api'));
router.get('/signout',homeController.destroySession);
// router.put('/forgot-password',homeController.forgotPassword);
// for any further routes,access from here
// router.use('/routername',require('./routerfile));
module.exports=router;
