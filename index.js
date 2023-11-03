var bodyParser = require("body-parser");
const express = require('express'); //express framework to have a higher level of methods
const app = express(); //assign app variable the express class/method
var http = require('http');
var path = require("path");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const server = http.createServer(app);//create a server
var io = require('socket.io').listen(server);
port=80
server.listen(port);

app.use('/', express.static(path.join('public')));

app.get('/', function (req, res) {
  res.sendFile(path.join('public','index.html'));
});

io.sockets.on('connection', function (socket) {

  console.log(`[server][info] Socket ${socket.id} connected.`);

  socket.on('disconnect', () => {
    console.log(`[server][info] Socket ${socket.id} disconnected.`);
  });

  socket.on('arduino_measure', function(data) {
      message = JSON.stringify(data);
      var time = Math.round(new Date().getTime() / 1000);
      var newmessage = message.replace('{','{"date_mesure":'+time+',');
      console.log(newmessage);
      io.emit('measure', newmessage);
  });
})