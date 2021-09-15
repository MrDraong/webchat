const express = require('express');
const app = express();

server = app.listen(8080, function(){
    console.log('server is running on port 8080');
});

const io = require('socket.io')(server);

let users = [];

io.on('connection', socket => {
  io.emit('userid',socket.id);
  socket.on("join server", username => {
    const user = {
      username,
      id: socket.id
    };
    users.push(user);
    io.emit("new user", users);
  });
  socket.on('SEND_MESSAGE', function(data) {
      io.emit('MESSAGE', data)
  });
});