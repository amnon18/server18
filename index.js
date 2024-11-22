var app = require('express')();
var server = require('http').createServer(app);    //var http = require('http').Server(app);
//var io = require('socket.io')(server);             //var io = require('socket.io')(http);
var io = require('socket.io')(server, {
   // pingInterval: 10000, // Send a ping every 10 seconds
    pingTimeout: 5000    // Disconnect if no pong is received within 5 seconds
});
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



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/base', function(req, res){
  res.sendFile(__dirname + '/base.html');
});
app.get('/console', function(req, res){
  res.sendFile(__dirname + '/console.html');
});

io.on('connection', function(socket){
	socket.on('delayer', function(msg){ 
		delay(1000);
		console.log('Sending...');
		io.emit(ausr, msg);
	});
	
});

io.use((socket, next) => {
  var originalOnevent = socket.onevent;
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
}




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

/*	APP to AMNON18	*/
// Receieved info from APP and send it directly the AMNON18 module
io.on('connection', function(socket){
	
	socket.on('amnon18', function(msg) {
		// Emit to a dynamic event name using the first 13 characters of msg
		var eventName = msg.substring(1, 13);
		console.log("EVENT:");
		console.log(eventName);

		console.log(eventName);
		io.emit(eventName, msg);
		return;
	});
	
	socket.on('base', function(msg){
		var eventName = msg.substring(0, 13);
		var WorldCommandName = msg.substring(14, 21);
		console.log("COMMAND:");
		console.log(WorldCommandName);
		console.log("EVENT:");
		console.log(eventName);
		
		if (WorldCommandName == "pingall"){
			console.log("In pingall");
			io.emit('pingall', "");
			return;			
		}
		if (WorldCommandName == "pingone"){
			console.log("In pingone");
			io.emit('pingone', eventName);
			return;			
		}
		if (WorldCommandName == "refresh"){
			console.log("In refresh");
			io.emit('refresh', eventName);
			return;			
		}
		
		console.log("In regular");
		io.emit('event', msg);
		return;	
			
	});
	
	socket.on('console', function(msg) {
		// Emit to a dynamic event name using the first 13 characters of msg
		var eventName = msg.substring(1, 13);
		console.log("EVENT:");
		console.log(eventName);
		console.log("Console info:");
		console.log(eventName);
		io.emit(eventName, msg);
		return;
	});

	 socket.on('new', function(username) {
			socket.username = username;
			clients.push(username); // Add the user to the clients array
			clientsession.push(socket.id);
			clientcount++;
			console.log('New user connected:', username);
			io.emit('updateUserList', clients); // Emit the updated user list
		});
	
		// Remove user on disconnect and send updated user list
		
		socket.on('disconnect', function () {
			const index = clientsession.indexOf(socket.id); // Find the session index of the disconnected user
			if (index !== -1) {
				const removedUser = clients[index]; // Get the username of the disconnected user
				console.log(`User disconnected: ${removedUser}`);
		
				// Remove user details from the arrays
				clients.splice(index, 1);
				clientsession.splice(index, 1);
		
				// Decrement counters
				clientcount--;
				numUsers--;
		
				// Ensure counters don't go below zero
				clientcount = Math.max(clientcount, 0);
				numUsers = Math.max(numUsers, 0);
		
				// Notify all connected clients about the updated user list
				io.emit('updateUserList', clients);
		
				console.log(`Current connected users: ${clients}`);
				console.log(`Number of users connected: ${numUsers}`);
			}
		});
});


server.listen(port, function(){
  console.log('listening on *:' + port);
});

/*
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
		console.log('AMNON18 connected: '+ numUsers);
		if (clientcount<0) clientcount=0;
	});

	socket.on('new', function(username) {
	
		addedUser = true;
		socket.username = username;
		//io.emit('remote', socket.username+' joined remote service.');
		console.log('New AMNON18 connected: '+ socket.username);
		numUsers++;
		//////io.emit('remote', 'Number of clients online: '+numUsers);
		//////io.emit('rid', username);
	//	console.log(username);
		clients[clientcount] =  socket.username;
		clientsession[clientcount] =  socket.id;
		clientcount++;
		console.log('AMNON18 connected: '+ numUsers);
	});
	*/