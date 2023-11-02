const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('base', () => {
    console.log('message sent');
  });
});

io.on('message', (socket) => {
  console.log('Receieveing....');
  socket.on('base', (message) => {
    console.log('Message Received: ' + message);
    io.emit('message', message);
  });
//  socket.on('base', (msg) => {
//    console.log('message sent'.msg);
//  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
