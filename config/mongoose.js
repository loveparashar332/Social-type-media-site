const mongoose=require('mongoose');
const env =require('./enviroment');
//to connect with the db
mongoose.connect(`mongodb://localhost:27017/${env.db}`);
//acquire the connection to check whether it is successful or not
const db=mongoose.connection;
//on error displaying the message
db.on('error',console.error.bind(console,"Error connecting mongoDB"));
//if opens means connection is setup then show connected to server
db.once('open',function(){
    console.log('connected to database :: MongoDB'); 
});

module.exports=db;
