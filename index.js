const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//app.get('/', (req, res) => {
//  res.send('Hello World!');
//});

io.on('connection', (socket) => {
  console.log('A user connected');

 socket.on('*', (packet) => {
    // packet is an array with the event name as the first element followed by any data
    const eventName = packet[0];
    const eventData = packet[1];
    console.log('Event Received:', eventName, 'Data:', eventData);
	});
  
  // Listen for messages from this specific client
  //socket.on('message', (data) => {
  //  console.log('Message Received:', data);
  //});

  // Listen for this specific client to disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

