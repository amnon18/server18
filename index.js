var app = require('express')();
var server = require('http').createServer(app);    //var http = require('http').Server(app);
var io = require('socket.io')(server);             //var io = require('socket.io')(http);
//var cors = require('cors');
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


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/base', function(req, res){
  res.sendFile(__dirname + '/base.html');
});

app.get('/app', function(req, res){
  res.sendFile(__dirname + '/webapp.html');
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
		if (msg.substr(0,2) == '$S'){
			ausr = msg.substr(2,4);
			return;
		}
		if (msg.substr(0,2) == '$L'){
		    io.emit('remote', "Clients online: "+numUsers);
			for (var x=0;x<=clientsession.length-1;x++) {
				io.emit('remote',  "Client ID: "+clients[x]+":"+clientsession[x]);
			}
		}else{
			io.emit(ausr, msg);
		}
	});
});

// Receieved info from remote and sends to base
io.on('connection', function(socket){
	socket.on('base', function(msg){
		io.emit('remote', msg);
		return;
	});


socket.on('disconnect', function () {
	io.emit('remote', 'Customer left remote comm. '+this.id);
	for (var r=0;r<=clientsession.length-1;r++){
		if (clientsession[r] == this.id){
			clientsession.splice(r, 1); 				
			clients.splice(r, 1); 				
		}
	}
	socket.disconnect(true);
	numUsers--;
	clientcount--;
	if (numUsers<0) numUsers=0;
	if (clientcount<0) clientcount=0;
});

socket.on('new', function(username) {
	
	addedUser = true;
	socket.username = username;
	io.emit('remote', socket.username+' joined remote service.');
	numUsers++;
	io.emit('remote', 'Number of clients online: '+numUsers);
	io.emit('rid', username);
	console.log(username);
	clients[clientcount] =  username;
	clientsession[clientcount] =  socket.id;
	clientcount++;
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
  console.log('listening on *:' + port);
});

