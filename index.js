var app = require('express')();
var server = require('http').createServer(app);    //var http = require('http').Server(app);
var io = require('socket.io')(server);             //var io = require('socket.io')(http);
var port = process.env.PORT || 4000;

//************************************************
var numUsers = 0;
var clients = []
var clientsession = []
var clientcount = 0;
var users = {};
var userNumber = 1;
var ausr = ''; //Active user
//************************************************

// Allow access control for web requests

app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
next();
});


io.on('connection', function(socket){
	socket.on('delayer', function(msg){ 
		delay(1000);
		console.log('Sending...');
		io.emit(ausr, msg);
	});
	
});

function delay(ms) {
			var cur_d = new Date();
			var cur_ticks = cur_d.getTime();
			var ms_passed = 0;
			while(ms_passed < ms) {
				var d = new Date();  // Possible memory leak?
				var ticks = d.getTime();
				ms_passed = ticks - cur_ticks;
				// d = null;  // Prevent memory leak?
    	    }
	    }


io.on('connection', function(socket){
	socket.on('remote', function(msg){ 
	io.emit(ausr, msg);
	});
});

// Receieved info from remote and sends to base
io.on('connection', function(socket){
	socket.on('base', function(msg){
		io.emit('remote', msg);
		return;
	});


socket.on('disconnect', function () {
	io.emit('remote', 'Customer left remote comm. ');
	socket.disconnect(true);
});

socket.on('new', function(username) {
	
	addedUser = true;

	io.emit('remote', 'joined remote service.');
	console.log(username);
});

// when the client emits 'add user', this listens and executes
socket.on('add user', function (username) {
	if (addedUser) return;
	// we store the username in the socket session for this client
	socket.username = username;
	++numUsers;
	addedUser = true;
	socket.emit('remote', {
	  numUsers: numUsers
	});
	io.emit('remote', 'Customer joined remote com.');
	 ++numUsers;
	});
});


server.listen(port, function(){
  io.emit('remote', 'Listening.....');
  console.log('listening on *:' + port);
});
