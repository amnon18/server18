// Get references to UI elements
let connectButton = document.getElementById('connect');
let updateButton = document.getElementById('update');

let pump_Button = document.getElementById('pumpbutton');
let second_Button = document.getElementById('sectankopen');
let ab_Button = document.getElementById('abbutton');
let gas_Button = document.getElementById('gasbutton');
let remo_Button = document.getElementById('remobutton');

//let disconnectButton = document.getElementById('disconnect');
let terminalContainer = document.getElementById('terminal');
//let sendForm = document.getElementById('send-form');
//let inputField = document.getElementById('input');
//let time_form = document.getElementById('time_form');
//let time_input = document.getElementById('time_input');
//let date_form = document.getElementById('date_form');
//let date_input = document.getElementById('date_input');
//let reset_form = document.getElementById('reset_form');
//let reset_input = document.getElementById('reset_input');

var lastopen = null;
var a18_connected = 0;
var menuopen = 0;
var splashlogo = document.getElementById('splash');
var datafroma18 = ["0","0","0","0","0","0","0","0","0","0","0","0"];
var datafroma18cnt = 0;
var activemenu = 0;
var dataarray;
var btresponse;
var pump_test = 1;

var d0;
var d1;
var d2;
var d3;
var d4;
var d5;
var d6;
var d7;
var d8;
var d9;
var d10;
var d11;
var d12;
var d13;
var d14;
var d15;
var d16;
var d17;
var d18;
var d19;
var d20;
var d21;
var d22;
var d23;


// Connect to the device on Connect button click
connectButton.addEventListener('click', function() {
if (a18_connected == 0){
	connect(); 
	splashlogo.style.display = "none";
}else{
	send("RRRR");
	a18_connected = 0
	document.getElementById("condis_button").innerHTML = "Connect";
	mainmenu.style.display = "none";
	splashlogo.style.display = "block";
	document.getElementById("menutitle").innerHTML = "";
	updateButton.style.display = "none";
	lastopen.style.display = "none";
 	disconnect();
}

});

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// Update the device parameters UPDATE button click
updateButton.addEventListener('click', function() {

	if (a18_connected == 1){	// Time section
		updateButton.style.display = "none";
		if (activemenu == 1){
			d0 = document.getElementById("form_time_hours").value;
			d1 = document.getElementById("form_time_minutes").value;
			send("T"+d0+d1);
			document.getElementById("menutitle").innerHTML = "";
			lastopen.style.display = "none";
		}
		if (activemenu == 2){	// Date section
			d0 = document.getElementById("form_date_day").value;
			d1 = document.getElementById("form_date_month").value;
			d2 = document.getElementById("form_date_year").value;
			send("D"+d0+d1+d2);
			document.getElementById("menutitle").innerHTML = "";
			lastopen.style.display = "none";
		}
		if (activemenu == 3){	// Options section
			d0 = document.getElementById("form_options_holtemp").value;
			d1 = document.getElementById("form_options_syttemp").value;
			d2 = document.getElementById("form_options_tminus").value;
			d3 = document.getElementById("form_options_iph").value;
			d4 = document.getElementById("form_options_ril").value;
			d5 = document.getElementById("form_options_residual").value;
			d6 = (document.getElementById("form_options_legion").checked) ? 1 : 0;
			d7 = document.getElementById("form_options_reltype").value;
			d8 = document.getElementById("form_options_tanktype").value;
			d9 = document.getElementById("form_options_purge").value;
			d10 = document.getElementById("form_options_tempbuff").value;
			d11 = (document.getElementById("form_options_autobal").checked) ? 1 : 0;
			d12 = document.getElementById("form_options_tanksize").value;
			d13 = (document.getElementById("form_options_valvechk").checked) ? 1 : 0;
			d14 = document.getElementById("form_options_holitemp").value;
			d15 = (document.getElementById("form_options_night").checked) ? 1 : 0;
			d16 = document.getElementById("form_options_autobaltime").value;
			d17 = document.getElementById("form_options_shabtime").value;
			d18 = (document.getElementById("form_options_chassid").checked) ? 1 : 0;
			d19 = (document.getElementById("form_options_summer").checked) ? 1 : 0;
			d20 = (document.getElementById("form_options_rabtam").checked) ? 1 : 0;
			d21 = (document.getElementById("form_options_leak").checked) ? 1 : 0;
			d22 = (document.getElementById("form_options_second").checked) ? 1 : 0;
			d23 = (document.getElementById("form_options_wifi").checked) ? 1 : 0;
			console.log("Sending: "+d0+","+d1+","+d2+","+d3+","+d4+","+d5+","+d6+","+d7+","+d8+","+d9+","+d10+","+d11+","+d12+","+d13+","+d14+","+d15+","+d16+","+d17+","+d18+","+d19+","+d20+","+d21+","+d22+","+d23);
			send("O"+d0+","+d1+","+d2+","+d3+","+d4+","+d5+","+d6+","+d7+","+d8+","+d9+","+d10+","+d11+","+d12+","+d13+","+d14+","+d15+","+d16+","+d17+","+d18+","+d19+","+d20+","+d21+","+d22+","+d23);
			document.getElementById("menutitle").innerHTML = "";
			lastopen.style.display = "none";
		}
		if (activemenu == 4){	// geolocation section
			d0 = document.getElementById("form_geo_lon").value;
			d1 = document.getElementById("form_geo_lat").value;
			d2 = document.getElementById("form_geo_gmt").value;
			d3 = document.getElementById("form_geo_dif").value;
			send("H"+d0+","+d1+","+d2+"."+d3);
			document.getElementById("menutitle").innerHTML = "";
			lastopen.style.display = "none";
		}
		if (activemenu == 6){	// Tuning section
			d0 = document.getElementById("form_tnt_sysfreq").value;
			d1 = document.getElementById("form_tnt_pumpmodfreq").value;
			d2 = document.getElementById("form_tnt_pumppeak").value;
			d3 = document.getElementById("form_tnt_secpeakdelay").value;
			d4 = document.getElementById("form_tnt_secholdmod").value;
			d5 = document.getElementById("form_tnt_pilotpeakdelay").value;
			d6 = document.getElementById("form_tnt_pilotholdmod").value;
			console.log("d0:"+d0);
			console.log("d1:"+d1);
			console.log("d2:"+d2);
			console.log("ud3:"+d3);
			console.log("ud4:"+d4);
			console.log("ud5:"+d5);
			console.log("ud6:"+d6);
			send("Q"+d1+","+d2+","+d0+","+d3+","+d4+","+d5+","+d6);
			document.getElementById("menutitle").innerHTML = "";
			lastopen.style.display = "none";
		}
		activemenu = 0;
	}
});

// Control pump button click
pump_Button.addEventListener('click', function() {
		console.log("In testing function for pump");

	if (a18_connected == 1){	// Time section
		if (pump_test == "1"){
			console.log("In STOP for pump");
			send("q"+datafroma18[0]);
			sectankopen.style.display = "none";
			abbutton.style.display = "none";
			document.getElementById("pumpbutton").innerHTML = "STOP";
			pump_test = "0";
		}else{
			console.log("In START for pump");
			send("X");
			sectankopen.style.display = "block";
			abbutton.style.display = "block";
			document.getElementById("pumpbutton").innerHTML = "START";
			pump_test = "1";
		}
	}
});

second_Button.addEventListener('click', function() {
		console.log("In testing function for Second");

	if (a18_connected == 1){	// Time section
		if (pump_test == "1"){
			console.log("In CLOSE for tank");
			send("c1");
			pumpbutton.style.display = "none";
			abbutton.style.display = "none";
			document.getElementById("sectankopen").innerHTML = "CLOSE";
			pump_test = "0";
		}else{
			console.log("In OPEN for tank");
			send("c2");
			pumpbutton.style.display = "block";
			abbutton.style.display = "block";
			document.getElementById("sectankopen").innerHTML = "OPEN";
			pump_test = "1";
		}
	}
});

ab_Button.addEventListener('click', function() {
		console.log("In testing function for AB");

	if (a18_connected == 1){	// Time section
		if (pump_test == "1"){
			console.log("In CLOSE for AB");
			send("c3");
			pumpbutton.style.display = "none";
			sectankopen.style.display = "none";
			document.getElementById("abbutton").innerHTML = "STOP";
			pump_test = "0";
		}else{
			console.log("In OPEN for AB");
			send("c4");
			pumpbutton.style.display = "block";
			sectankopen.style.display = "block";
			document.getElementById("abbutton").innerHTML = "START";
			pump_test = "1";
		}
	}
});

gas_Button.addEventListener('click', function() {
	console.log("In testing function for GAS");
	if (a18_connected == 1){	// Time section
		if (pump_test == "1"){
			console.log("In CLOSE for GAS");
			send("c5");
			pumpbutton.style.display = "none";
			sectankopen.style.display = "none";
			abbutton.style.display = "none";
			document.getElementById("gasbutton").innerHTML = "CLOSE";
			pump_test = "0";
		}else{
			console.log("In OPEN for GAS");
			send("c6");
			pumpbutton.style.display = "block";
			sectankopen.style.display = "block";
			abbutton.style.display = "block";
			document.getElementById("gasbutton").innerHTML = "OPEN";
			pump_test = "1";
		}
	}
});


remo_Button.addEventListener('click', function() {
	console.log("In REMOTE function");
	if (a18_connected == 1){	// Time section
		if (pump_test == "1"){
		 	var xhttp = new XMLHttpRequest();
			xhttp.open("POST", "https://servera18.herokuapp.com/", true);
			xhttp.send();
			document.getElementById("remobutton").innerHTML = "CONNECTED";
			pump_test = "0";
		}else{
			document.getElementById("remobutton").innerHTML = "CONNECT";
			pump_test = "1";
		}
	}
});


// Disconnect from the device on Disconnect button click
//disconnectButton.addEventListener('click', function() {
//  disconnect();
//});


// Handle form submit event
//sendForm.addEventListener('submit', function(event) {
//  event.preventDefault(); // Prevent form sending
//  send(inputField.value); // Send text field contents
//  inputField.value = '';  // Zero text field
//  inputField.focus();     // Focus on text field
//});

// Handle form submit event
/*time_form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form sending
  time_str = "T"+time_input.value;
  send(time_str); // Send text field contents
  time_str = '';
  time_input.value = '';  // Zero text field
  time_input.focus();     // Focus on text field
});

// Handle form submit event
date_form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form sending
  date_str = "D"+date_input.value;
  send(date_str); // Send text field contents
  date_str = '';
  date_input.value = '';  // Zero text field
  date_input.focus();     // Focus on text field
});

// Handle form submit event
reset_form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form sending
  date_str = "R";
  send(date_str); // Send text field contents
 
});
*/


function send(data) {
  data = String(data);

  if (!data || !characteristicCache) {
    return;
  }

  //data += '\n';

  if (data.length > 60) {
    let chunks = data.match(/(.|[\r\n]){1,60}/g);

    writeToCharacteristic(characteristicCache, chunks[0]);

    for (let i = 1; i < chunks.length; i++) {
      setTimeout(() => {
        writeToCharacteristic(characteristicCache, chunks[i]);
      }, i * 100);
    }
  }
  else {
    writeToCharacteristic(characteristicCache, data);
  }

  log(data, 'out');
}

function writeToCharacteristic(characteristic, data) {
  characteristic.writeValue(new TextEncoder().encode(data));
}

//----------------------------- Added Code: connect to bluetooth device -----------------------//
// Selected device object cache
let deviceCache = null;

// Launch Bluetooth device chooser and connect to the selected
function connect() {
  return (deviceCache ? Promise.resolve(deviceCache) :
      requestBluetoothDevice()).
      then(device => connectDeviceAndCacheCharacteristic(device)).
      then(characteristic => startNotifications(characteristic)).
      catch(error => log(error));
}
//-------------------- Connect to bluetooth device -----------------------//
function requestBluetoothDevice() {
  //log('Requesting bluetooth device...');

  return navigator.bluetooth.requestDevice({
    filters: [{services: [0xFFE0]}],
  }).
      then(device => {
       // log('"' + device.name + '" bluetooth device selected');
        deviceCache = device;

        // Added line
        deviceCache.addEventListener('gattserverdisconnected',
            handleDisconnection);

        return deviceCache;
      });
}

// handles the problem of bluetooth disconnecting for no reason
// tries to reconnect once
function handleDisconnection(event) {
  let device = event.target;


//  log('"' + device.name +
 //     '" bluetooth device disconnected, trying to reconnect...');

  connectDeviceAndCacheCharacteristic(device).
      then(characteristic => startNotifications(characteristic)).
      catch(error => log(error));
}
//---------------- disconnect keeps the browser from re-connecting with the bluetooth device
function disconnect() {
  if (deviceCache) {
//    log('Disconnecting from "' + deviceCache.name + '" bluetooth device...');
    deviceCache.removeEventListener('gattserverdisconnected',
        handleDisconnection);

    if (deviceCache.gatt.connected) {
      deviceCache.gatt.disconnect();
//      log('"' + deviceCache.name + '" bluetooth device disconnected');
    }
    else {
//      log('"' + deviceCache.name +
  //        '" bluetooth device is already disconnected');
    }
  }

  // Added condition
  if (characteristicCache) {
    characteristicCache.removeEventListener('characteristicvaluechanged',
        handleCharacteristicValueChanged);
    characteristicCache = null;
  }

  deviceCache = null;
}
//-----------------------------------------------------------------//

// Characteristic object cache
let characteristicCache = null;

// Connect to the device specified, get service and characteristic
function connectDeviceAndCacheCharacteristic(device) {
  if (device.gatt.connected && characteristicCache) {
    return Promise.resolve(characteristicCache);
  }

//  log('Connecting to GATT server...');

  return device.gatt.connect().
      then(server => {
//        log('GATT server connected, getting service...');

        return server.getPrimaryService(0xFFE0);
      }).
      then(service => {
//        log('Service found, getting characteristic...');

        return service.getCharacteristic(0xFFE1);
      }).
      then(characteristic => {
//        log('Characteristic found');
        characteristicCache = characteristic;

        return characteristicCache;
      });
}

// Enable the characteristic changes notification
function startNotifications(characteristic) {
//  log('Starting notifications...');

  return characteristic.startNotifications().
      then(() => {
//        log('Notifications started');
        // Added line
		  send("A");
        characteristic.addEventListener('characteristicvaluechanged',
            handleCharacteristicValueChanged);
      });
}

// Output to terminal
function log(data, type = '') {
  terminalContainer.insertAdjacentHTML('beforeend',
      '<div' + (type ? ' class="' + type + '"' : '') + '>' + data + '</div>');
}

// Intermediate buffer for incoming data
let readBuffer = '';

// Data receiving
function handleCharacteristicValueChanged(event) {
  let value = new TextDecoder().decode(event.target.value);

  for (let c of value) {
    if (c === '\n') {
      let data = readBuffer.trim();
      readBuffer = '';

      if (data) {
        receive(data);
      }
    }
    else {
      readBuffer += c;
    }
  }
}

// Received data handling
function receive(data) {
	if (data === "K" && a18_connected == 0){
		a18_connected = 1;
		document.getElementById("condis_button").innerHTML = "Disconnect";
 		log(data, 'in');
		return;
	}
	if (a18_connected == 1){
		if (activemenu == 0){
			data ="";
			return;
		}

		if (activemenu == 1){
			console.log(data);
			datafroma18[0] = data.substring(0,2);
			datafroma18[1] = data.substring(2,4);
			document.getElementById("show_hours").innerHTML = datafroma18[0];
			document.getElementById("show_minutes").innerHTML = datafroma18[1];
			selectFunction(1);
			return;
		} 
		if (activemenu == 2){
			console.log(data);
			datafroma18[0] = data.substring(0,2);
			datafroma18[1] = data.substring(2,4);
			datafroma18[2] = data.substring(4,8);
			document.getElementById("show_day").innerHTML = datafroma18[0];
			document.getElementById("show_month").innerHTML = datafroma18[1];
			document.getElementById("show_year").innerHTML = datafroma18[2];
			selectFunction(2);
			return;
		}
		if (activemenu == 3){
			console.log(data);
			dataarray = data.split(",");
			datafroma18[0] = dataarray[0];
			datafroma18[1] = dataarray[1];
			datafroma18[2] = dataarray[2];
			datafroma18[3] = dataarray[3];
			datafroma18[4] = dataarray[4];
			datafroma18[5] = dataarray[5];
			datafroma18[6] = dataarray[6];
			datafroma18[7] = dataarray[7];
			datafroma18[8] = dataarray[8];
			datafroma18[9] = dataarray[9];
			datafroma18[10] = dataarray[10];
			datafroma18[11] = dataarray[11];
			datafroma18[12] = dataarray[12];		// Tank size
			datafroma18[13] = dataarray[13];		// Auto check valve
			datafroma18[14] = dataarray[14];
			datafroma18[15] = dataarray[15];
			datafroma18[16] = dataarray[16];
			datafroma18[17] = dataarray[17];
			datafroma18[18] = dataarray[18];
			datafroma18[19] = dataarray[19];
			datafroma18[20] = dataarray[20];
			datafroma18[21] = dataarray[21];
			datafroma18[22] = dataarray[22];
			datafroma18[23] = dataarray[23];
			datafroma18[24] = dataarray[24];

//			document.getElementById("form_options_holtemp").innerHTML = datafroma18[0];
//			document.getElementById("form_options_syttemp").innerHTML = datafroma18[1];
//			document.getElementById("form_options_tminus").innerHTML = datafroma18[2];
			selectFunction(3);
			return;
		}
		if (activemenu == 4){
			console.log(data);
			dataarray = data.split(",");
			datafroma18[0] = dataarray[0];
			datafroma18[1] = dataarray[1];
			datafroma18[2] = dataarray[2];

			document.getElementById("form_geo_lon").value = datafroma18[0];
			document.getElementById("form_geo_lat").value = datafroma18[1];
			selectFunction(4);
			return;
		}
		
		if (activemenu == 6){
			console.log(data);
			dataarray = data.split(",");
			datafroma18[0] = dataarray[0];
			datafroma18[1] = dataarray[1];

			activemenu = 61;
			
			send("u");							// Get Second tank info
			return;
		}
		if (activemenu == 61){
			console.log(data);
			dataarray = data.split(",");
			datafroma18[5] = dataarray[0]/1000;
			datafroma18[6] = dataarray[1];

			activemenu = 62;
			send("m902");						// Get system frequency
			return;
		}
		if (activemenu == 62){
			console.log(data);
			dataarray = data; //.split(",");
			datafroma18[4] = dataarray[0];
			activemenu = 63;
			send("w");							// Get gas pilot info
			return;
		}
		if (activemenu == 63){
			console.log(data);
			dataarray = data.split(",");
			datafroma18[2] = dataarray[0]/1000;
			datafroma18[3] = dataarray[1];			
			activemenu = 6;
			selectFunction(6);
			return;
		}
		
		if (activemenu == 7){
			console.log(data);
			dataarray = data.split(",");
			datafroma18[0] = dataarray[0];
			datafroma18[1] = dataarray[1];

			activemenu = 7;
			selectFunction(7);
			return;
		}
		if (activemenu == 10){
			console.log(data);
//			dataarray = data.split(",");
//			datafroma18[0] = dataarray[0];
//			datafroma18[1] = dataarray[1];

			activemenu = 10;
			selectFunction(10);
			return;
		}

		if (activemenu == 5){

			
//			document.getElementById("form_options_holtemp").innerHTML = datafroma18[0];
//			document.getElementById("form_options_syttemp").innerHTML = datafroma18[1];
//			document.getElementById("form_options_tminus").innerHTML = datafroma18[2];
// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
			return;
		}


	}

}