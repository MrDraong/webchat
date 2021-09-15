const express = require('express');
const app = express();

server = app.listen(8080, function(){
    console.log('server is running on port 8080');
});

const io = require('socket.io')(server);

let users = [];

const messages = {
  general: [],
  game: [],
};

io.on('connection', socket => {

  socket.on("join server", username => {
    const user = {
      username,
      id: socket.id
    };
    users.push(user);
    io.emit("new user", users);
  });

  socket.on("join room", (roomName, callback) => {
    socket.join(roomName);
    callback(messages[roomName]);
    socket.emit("joined", messages[roomName]);
  });

  socket.on("send message", ({content, to, sender, chatName, isChannel}) =>{
    if(isChannel){
      const payload = {
        content,
        chatName,
        sender
      };
      socket.to(to).emit("new message", payload);
    }
    else{
      const payload = {
          content,
          chatName: sender,
          sender
      };
      socket.to(to).emit("new message", payload);
    }
    if(messages[chatName]){
      messages[chatName].push({
        sender,
        content
      });
    }
  });

  socket.on("disconnect", () => {
    users = users.filter(u => u.id !== socket.id);
    io.emit("new user", users);
  });

  //socket.on('SEND_MESSAGE', function(data) {
  //   io.emit('MESSAGE', data)
  //});
});