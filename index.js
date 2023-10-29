const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    // Optionally, send a reply back to the client
    socket.emit('reply', 'Message received');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
