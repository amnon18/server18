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


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/base', function(req, res){
  res.sendFile(__dirname + '/base.html');
});

io.on('connection', function(socket){
	socket.on('delayer', function(msg){ 
		delay(1000);
		console.log('Sending...');
		io.emit(ausr, msg);
	});
	
});

io.use((socket, next) => {
  const originalOnevent = socket.onevent;
  socket.onevent = function (packet) {
    const [eventName, ...args] = packet.data;
    console.log(`Event received: ${eventName}`);

    // Catch-all event listener
    catchAllEventListener(socket, eventName, ...args);
//	io.emit('1969', "HELLO WORLD OF WEYOU");
    // Call the original onevent function
    originalOnevent.call(this, packet);
  }; 
  next();
});

function catchAllEventListener(socket, eventName, ...args) {
  console.log('Catch-all event listener triggered');
  console.log('Event Name:', eventName);
  console.log('Arguments:', args);
  socket.on('amnno18', function(msg){ 
  	console.log('Data sent:', msg);
	console.log('Data2 sent:', args);
	});
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


io.on('connection', function(socket) {
    
    /* AMNON18 to APP */
    // Received info from APP and send it directly to the AMNON18 module
    socket.on('amnon18', function(msg) {
        if (typeof msg === 'string' && msg.length >= 14) {
            // Emit to a dynamic event name using the first 13 characters of msg
            var eventName = msg.substring(1, 14);
            console.log(eventName);
            io.emit(eventName, msg);
        } else {
            console.error("Error: msg must be a string of at least 14 characters.");
        }
        return;
    });

    /* APP to AMNON18 */
    // Received info from APP and send it directly to the AMNON18 module
    socket.on('base', function(msg) {
        if (typeof msg === 'string' && msg.length >= 13) {
            var eventName = msg.substring(0, 13);
            console.log(eventName);
            io.emit(eventName, msg);
        } else {
            console.error("Error: msg must be a string of at least 13 characters.");
        }
        return;
    });
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
	//io.emit('remote', 'Customer joined remote com.'+username);
	 ++numUsers;
	});
});


server.listen(port, function(){
  console.log('listening on *:' + port);
});

