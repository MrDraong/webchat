const express = require('express');
const app = express();

server = app.listen(3301, function(){
    console.log('server is running on port 3301');
});

const io = require('socket.io')(server);

let users = [];

const messages = {
  general: [{"content" : "Salut", "sender" : "MrDraong"}],
  other: [{"content" : "Other", "sender" : "MrDraong"}],
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

  socket.on("join room", (roomName) => {
    socket.join(roomName);
    socket.emit("joined", messages[roomName]);
  });

  socket.on("send message", ({content, sender, chatName}) =>{
    
    const payload = {
      content,
      sender,
      chatName
    };
    socket.emit("new message", payload);
    
    if(messages[chatName]){
      messages[chatName].push({
        content,
        sender
      });
    }
  });

  socket.on("disconnect", () => {
    users = users.filter(u => u.id !== socket.id);
    io.emit("new user", users);
  });
});