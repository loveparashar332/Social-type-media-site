
module.exports.chatSockets = function(socketServer){
       let io = require('socket.io')(socketServer);


     io.sockets.on('connection',function(socket){
           console.log('new connection recieved',socket.id);
           socket.on('disconnect',function(){
               console.log('socket disconnected!!!');
           });
           // socket.on detect an event for which request is send by the user to server
       socket.on('join_room',function(data){
        console.log('joining request rec',data);
       // allowing socket to join the chatroom on requesting by user from clientside
        socket.join(data.chatroom);

       // now sending the notfication to all users who are a part of chat room that this guy has joined the chatroom
       io.in(data.chatroom).emit('user_joined',data);
          
      });
      //detect send messages and broadcast to everyone in the room
      socket.on('send_message',function(data){
            console.log('clicked',data);
            io.in(data.chatroom).emit('recieve_message',data);
      });

   });
     

} 