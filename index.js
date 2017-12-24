var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 4000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/base', function(req, res){
  res.sendFile(__dirname + '/base.html');
});

io.on('connection', function(socket){
	socket.on('remote', function(msg){ 
    io.emit('base', msg);
	console.log(msg);
  });
});

io.on('connection', function(socket){
	socket.on('base', function(msg){
    io.emit('remote', msg);
	console.log(msg);
  });
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
