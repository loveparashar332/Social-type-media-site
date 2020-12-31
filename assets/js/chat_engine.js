// here this class is for front end part now ready to send the connection to server
class ChatEngine{
    constructor(chatBoxId, userEmail,userName){
        this.ChatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.userName = userName;
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.conectionHandler();
        }
    }
   // connection handler is a function which is handling the connection between user(subscriber) to observer(server)
    conectionHandler(){
        let self = this;
        this.socket.on('connect',function(){
             console.log('connection established using sockets....!!');
             self.socket.emit('join_room',{
                 user_email: self.userEmail,
                 chatroom: 'codeial'
             });
             self.socket.on('user_joined',function(data){
                 console.log('a user joined',data);
             })
        });
        //sending a message on cicking the send message
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
            if(msg!= ''){
                self.socket.emit('send_message',{
                     message: msg,
                     user_email: self.userEmail,
                     user_name: self.userName,
                     chatroom: 'codeial'
                });
            }
        });
        
        self.socket.on('recieve_message',function(data){
            console.log('message received', data.message);

            let newMessage = $('<li>');
           
            let messageType = 'other-message';
             if(data.user_email == self.userEmail){
                 messageType = 'self-message';
             }
            
             newMessage.append($('<span>',{
                  'html': data.message
             }));

             newMessage.append($('<sub>',{
                 'html': data.user_name
             }));

             newMessage.addClass(messageType);
             $('#chat-messages-list').append(newMessage);
        });
    }
}