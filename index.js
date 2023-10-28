const http = require('http');
const socketIo = require('socket.io');

// Create HTTP server
const server = http.createServer((req, res) => {
  res.end('Socket.IO server');
});

// Attach Socket.IO to the server
const io = socketIo(server);

// Setup connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  // Setup disconnection event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
