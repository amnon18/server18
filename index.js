const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.onAny((eventName, ...args) => {
    const profile = args.find(arg => arg.profile);
    if(profile) {
      console.log(`Received message from ${profile.name}:`);
    } else {
      console.log(`Received anonymous message:`);
    }
    console.log(`Event: ${eventName}, Message:`, args);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(4000, () => {
  console.log('listening on *: 4000');
});
