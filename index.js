const express= require('express');
const env=require('./config/enviroment');
const logger = require('morgan');
//for reading and writing from cookie
const cookieParser=require('cookie-parser');
const port= 8000;
const app=express();
require('./config/view-helper')(app);
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose');
// used for session cookie 
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const passportgoogle=require('./config/passport-google-oauth2-startegy');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');
// set up the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const ChatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path = require('path');
if(env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path,'scss'),
        dest: path.join(__dirname, env.asset_path,'css'),
        debug:true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}

// to use parser middlewares to take the form data
app.use(express.urlencoded());
app.use(expressLayouts);
app.use(cookieParser());

//extract style and scripts from sub pages into the layout

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// use express routers
app.use(express.static(env.asset_path));
// make uploads path available to browser
app.use('/uploads', express.static(__dirname + '/uploads'));


app.use(logger(env.morgan.mode, env.morgan.options));
//set up the view engine
app.set('view engine','ejs');
app.set('views','./views'); 
//mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    //todo change the secret before deployment in production mode
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore(
        {   host: '127.0.0.1',
            port: '27017',
            useNewUrlParser: true,
            autoRemove: 'disabled',
            url: 'mongodb://localhost:27017/demo'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use('/',require('./routes'));
app.listen(process.env.PORT || 8000,function(err){
    if(err){
        //interpolation using backticks
        console.log(`error in running the server : ${err}`);
    }
    console.log(`server is running on port : ${port}`);
});