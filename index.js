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

  // Listen for messages from this specific client
  socket.on('message', (message) => {
    console.log('Message Received:', message);
  });

  // Listen for this specific client to disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

io.use((socket, next) => {
  const originalOnevent = socket.onevent;
  socket.onevent = function (packet) {
    const [eventName, ...args] = packet.data;
    console.log(`Event received: ${eventName}`);

    // Catch-all event listener
    catchAllEventListener(socket, eventName, ...args);

    // Call the original onevent function
    originalOnevent.call(this, packet);
  };
  next();
});

function catchAllEventListener(socket, eventName, ...args) {
  console.log('Catch-all event listener triggered');
  console.log('Event Name:', eventName);
  console.log('Arguments:', args);
  
  // You can add custom logic here to handle any event as needed
}