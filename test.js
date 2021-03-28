const socket = io('https://servera18.herokuapp.com');
var login_id = Math.random();
login_id = login_id.toString().substr(2,4);

// Get references to UI elements
let connectButton = document.getElementById('connect');
let updateButton = document.getElementById('update');
//let secretButton = document.getElementById('secret');
let logged = document.getElementById('logcontent');
let loaderperc = document.getElementById('loader');

let pump_Button = document.getElementById('pumpbutton');
let second_Button = document.getElementById('sectankopen');
let ab_Button = document.getElementById('abbutton');
let gas_Button = document.getElementById('gasbutton');
let remo_Button = document.getElementById('remobutton');

let terminalContainer = document.getElementById('terminal');

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
var log_ask = 0;
var secretcnt = 0;
var log_rows = 0;
var clientcode = "";

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
		a18_connected = 2;
		document.getElementById("condis_button").innerHTML = "Connect";
		mainmenu.style.display = "none";
		splashlogo.style.display = "block";
		lastopen.style.display = "none";
		updateButton.style.display = "none";
		document.getElementById("menutitle").innerHTML = "";
		send("R");	
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
			appupdatedb("T"+d0+d1);
			send("T"+d0+d1);
			document.getElementById("menutitle").innerHTML = "";
			lastopen.style.display = "none";
			alert("Time saved");
		}
		if (activemenu == 2){	// Date section
			d0 = document.getElementById("form_date_day").value;
			d1 = document.getElementById("form_date_month").value;
			d2 = document.getElementById("form_date_year").value;
			appupdatedb("D"+d0+d1+d2);
			send("D"+d0+d1+d2);
			document.getElementById("menutitle").innerHTML = "";
			lastopen.style.display = "none";
			alert("Date saved");
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
			appupdatedb("O"+d0+","+d1+","+d2+","+d3+","+d4+","+d5+","+d6+","+d7+","+d8+","+d9+","+d10+","+d11+","+d12+","+d13+","+d14+","+d15+","+d16+","+d17+","+d18+","+d19+","+d20+","+d21+","+d22+","+d23);
			send("O"+d0+","+d1+","+d2+","+d3+","+d4+","+d5+","+d6+","+d7+","+d8+","+d9+","+d10+","+d11+","+d12+","+d13+","+d14+","+d15+","+d16+","+d17+","+d18+","+d19+","+d20+","+d21+","+d22+","+d23);
			document.getElementById("menutitle").innerHTML = "";
			lastopen.style.display = "none";
			alert("Options saved");
		}
		if (activemenu == 4){	// geolocation section
			d0 = document.getElementById("form_geo_lon").value;
			d1 = document.getElementById("form_geo_lat").value;
			d2 = document.getElementById("form_geo_gmt").value;
			d3 = document.getElementById("form_geo_dif").value;
			d4 = (document.getElementById("form_geo_day").checked) ? 1 : 0;
			appupdatedb("H"+d0+","+d1+","+d2+"."+d3+"K"+d4);
			send("H"+d0+","+d1+","+d2+"."+d3+"K"+d4);
			document.getElementById("menutitle").innerHTML = "";
			lastopen.style.display = "none";
			alert("GeoLocation saved");
			
		}
		if (activemenu == 5){	// Tuning section
			d0 = (document.getElementById("form_valetf_enable").checked) ? 1 : 0;
			d1 = document.getElementById("form_valet_fristart").value;
			d2 = document.getElementById("form_valet_frilong").value;
			d3 = (document.getElementById("form_valets_enable").checked) ? 1 : 0;
			d4 = document.getElementById("form_valet_satstart").value;
			d5 = document.getElementById("form_valet_satlong").value;
			appupdatedb("V"+d0+","+d1+","+d2+","+d3+","+d4+","+d5);
			send("V"+d0+","+d1+","+d2+","+d3+","+d4+","+d5);
			document.getElementById("menutitle").innerHTML = "";
			lastopen.style.display = "none";
			alert("Valet saved");
		}
		if (activemenu == 6){	// Tuning section
			d0 = document.getElementById("form_tnt_sysfreq").value;
			d1 = document.getElementById("form_tnt_pumpmodfreq").value;
			d2 = document.getElementById("form_tnt_pumppeak").value;
			d3 = document.getElementById("form_tnt_secpeakdelay").value;
			d4 = document.getElementById("form_tnt_secholdmod").value;
			d5 = document.getElementById("form_tnt_pilotpeakdelay").value;
			d6 = document.getElementById("form_tnt_pilotholdmod").value;
			appupdatedb("Q"+d1+","+d2+","+d0+","+d5+","+d6+","+d3+","+d4);
			send("Q"+d1+","+d2+","+d0+","+d5+","+d6+","+d3+","+d4);
			document.getElementById("menutitle").innerHTML = "";
			lastopen.style.display = "none";
			alert("Tuning saved");
		}
		if (activemenu == 8){	// DST Section
			d0 = document.getElementById("form_seq_win").value;
			d1 = document.getElementById("form_day_win").value;
			d2 = document.getElementById("form_mon_win").value;
			d3 = document.getElementById("form_chg_win").value;
			d4 = document.getElementById("form_hrp_win").value;
			d5 = document.getElementById("form_seq_sum").value;
			d6 = document.getElementById("form_day_sum").value;
			d7 = document.getElementById("form_mon_sum").value;
			d8 = document.getElementById("form_chg_sum").value;
			d9 = document.getElementById("form_hrp_sum").value;
			appupdatedb("S"+d0+","+d1+","+d2+","+d3+","+d4+","+d5+","+d6+","+d7+","+d8+","+d9);
			send("S"+d0+","+d1+","+d2+","+d3+","+d4+","+d5+","+d6+","+d7+","+d8+","+d9);
			document.getElementById("menutitle").innerHTML = "";
			lastopen.style.display = "none";
			alert("Daylight saving saved");
		}
		if (activemenu == 9){	// Inlet Water temperature
			var ds = {};
			var radioseq = 1;
			for (var l1=1;l1<=12;l1++){
				for (var l2=2;l2<=18;l2++){
					var e = document.getElementById("wt_"+radioseq);
					if (e.checked == true){
					 ds[l1] = l2;
					}
					radioseq++;
				}
			}
			appupdatedb("J"+ds[1]+","+ds[2]+","+ds[3]+","+ds[4]+","+ds[5]+","+ds[6]+","+ds[7]+","+ds[8]+","+ds[9]+","+ds[10]+","+ds[11]+","+ds[12]);
			send("J"+ds[1]+","+ds[2]+","+ds[3]+","+ds[4]+","+ds[5]+","+ds[6]+","+ds[7]+","+ds[8]+","+ds[9]+","+ds[10]+","+ds[11]+","+ds[12]);
			document.getElementById("menutitle").innerHTML = "";
			lastopen.style.display = "none";
			alert("Inlet temperatures saved");
		}
		if (activemenu == 12){	// Date section
			d0 = document.getElementById("form_log_day").value;
			d1 = document.getElementById("form_log_month").value;
			d2 = document.getElementById("form_log_year").value;
			console.log("y"+d0+d1+d2+".log");
			log_ask = 0;
			appupdatedb("y"+d0+d1+d2+".log");
			send("y"+d0+d1+d2+".log");
			return;
		}
		if (activemenu == 14){	// geolocation section
			d0 = document.getElementById("form_act_num").value;
			d0_str = d0.split("");
			console.log(d0_str);
			appupdatedb("B1"+d0_str);
			send("B1"+d0_str);
			document.getElementById("menutitle").innerHTML = "";
			lastopen.style.display = "none";
			alert("Activated");
			
		}
		activemenu = 0;
	}
});

function secretButton() {
	if (a18_connected == 1){	// Time section
		if (secretcnt == 10){
			updateButton.style.display = "none";	
	 		mainmenu.style.display = "none";			// Remove main menu from screen
			appupdatedb("Z");
			send("Z");
		}else{
			if (secretcnt < 10)
				secretcnt++;
		}
	}
};


// Control pump button click
pump_Button.addEventListener('click', function() {
	if (a18_connected == 1){	// Time section
		if (pump_test == "1"){
			send("q"+datafroma18[0]);
			sectankopen.style.display = "none";
			abbutton.style.display = "none";
			gasbutton.style.display = "none";
			document.getElementById("pumpbutton").innerHTML = "STOP";
			pump_test = "0";
		}else{
			send("X");
			sectankopen.style.display = "block";
			abbutton.style.display = "block";
			gasbutton.style.display = "block";
			document.getElementById("pumpbutton").innerHTML = "START";
			pump_test = "1";
		}
	}
});

second_Button.addEventListener('click', function() {
	if (a18_connected == 1){	// Time section
		if (pump_test == "1"){
			send("c1");
			pumpbutton.style.display = "none";
			abbutton.style.display = "none";
			gasbutton.style.display = "none";
			document.getElementById("sectankopen").innerHTML = "CLOSE";
			pump_test = "0";
		}else{
			send("c2");
			pumpbutton.style.display = "block";
			abbutton.style.display = "block";
			gasbutton.style.display = "block";
			document.getElementById("sectankopen").innerHTML = "OPEN";
			pump_test = "1";
		}
	}
});

ab_Button.addEventListener('click', function() {
	if (a18_connected == 1){	// Time section
		if (pump_test == "1"){
			send("c3");
			pumpbutton.style.display = "none";
			sectankopen.style.display = "none";
			gasbutton.style.display = "none";
			document.getElementById("abbutton").innerHTML = "STOP";
			pump_test = "0";
		}else{
			send("c4");
			pumpbutton.style.display = "block";
			sectankopen.style.display = "block";
			gasbutton.style.display = "block";
			document.getElementById("abbutton").innerHTML = "START";
			pump_test = "1";
		}
	}
});

gas_Button.addEventListener('click', function() {
	if (a18_connected == 1){	// Time section
		if (pump_test == "1"){
			send("c5");
			pumpbutton.style.display = "none";
			sectankopen.style.display = "none";
			abbutton.style.display = "none";
			document.getElementById("gasbutton").innerHTML = "CLOSE";
			pump_test = "0";
		}else{
			send("c6");
			pumpbutton.style.display = "block";
			sectankopen.style.display = "block";
			abbutton.style.display = "block";
			document.getElementById("gasbutton").innerHTML = "OPEN";
			pump_test = "1";
		}
	}
});

socket.on('disconnect', function () {
	socket.emit('base', login_id);
	console.log('you have been disconnected');
});

socket.on('rid', function(msg){
	if (login_id == '')
		login_id = msg;
});


socket.on(login_id, function(msg){
	console.log(msg);
	send(msg);	
});


remo_Button.addEventListener('click', function() {
	if (a18_connected == 1){	// Time section
		if (pump_test == "1"){
			activemenu = 10;
			if (login_id == "0"){
				login_id = Math.random();
				login_id = login_id.toString().substr(2,4);
			}
			socket.emit('new', login_id);
			document.getElementById("remobutton").innerHTML = "DISCONNECT"; 
			pump_test = "0";
		}else{
			activemenu = 10;
			socket.disconnect();
			login_id = "0";
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
	console.log(data);
	if (a18_connected == 2){
		a18_connected = 0;
		window.location.reload(); 
		disconnect();
	}
	
	if(secretcnt == 10){
		Loaderdone.style.display = "Block";				// Show loader wheel on screen
		document.getElementById("Loadertxt2").innerHTML = parseInt(100*(data/2000))+"%";
		if (data == "K"){
			document.getElementById("Loadertxt2").innerHTML = "100%";
			secretcnt = 0;
			Loaderdone.style.display = "None";				// Show loader wheel on screen
			window.location.reload();
		}
	}
		
	if (data === "K" && a18_connected == 0){
		a18_connected = 1;
		document.getElementById("condis_button").innerHTML = "Disconnect";
 		log(data, 'in');
		activemenu = 99;
		send("B0");
		return;
	}
	if (a18_connected == 1){
		if (activemenu == 0){
			data = "";
			return;
		}
		if (activemenu == 99){
			activemenu = 0;
			dataarray = data.split(",");
			for (var tempcode = 0;tempcode<=9;tempcode++){
				clientcode += dataarray[tempcode];
			}
			return;
		}

		if (activemenu == 1){
			datafroma18[0] = data.substring(0,2);
			datafroma18[1] = data.substring(2,4);
			document.getElementById("show_hours").innerHTML = datafroma18[0];
			document.getElementById("show_minutes").innerHTML = datafroma18[1];
			selectFunction(1);
			return;
		} 
		if (activemenu == 2){
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
			dataarray = data.split(",");
			datafroma18[0] = dataarray[0];
			datafroma18[1] = dataarray[1];
			datafroma18[2] = dataarray[2];

			document.getElementById("form_geo_lon").value = datafroma18[0];
			document.getElementById("form_geo_lat").value = datafroma18[1];
			activemenu = 41;
			send("m810");							// Get Daylight saving time flag 0 or 1
			return;
		}
		if (activemenu == 41){
			dataarray = data.split(",");
			datafroma18[5] = dataarray[0];
			activemenu = 4;
			selectFunction(4);
			return;
		}

		if (activemenu == 5){
			dataarray = data.split(",");
			datafroma18[0] = dataarray[0];
			datafroma18[1] = dataarray[1];
			datafroma18[2] = dataarray[2];
			datafroma18[3] = dataarray[3];
			datafroma18[4] = dataarray[4];
			datafroma18[5] = dataarray[5];
			selectFunction(5);
			return;
		}
		if (activemenu == 6){
			dataarray = data.split(",");
			datafroma18[0] = dataarray[0];
			datafroma18[1] = dataarray[1];

			activemenu = 61;
			
			send("u");							// Get Second tank info
			return;
		}
		if (activemenu == 61){
			dataarray = data.split(",");
			datafroma18[5] = dataarray[0]/1000;
			datafroma18[6] = dataarray[1];

			activemenu = 62;
			send("m902");						// Get system frequency
			return;
		}
		if (activemenu == 62){
			dataarray = data; //.split(",");
			datafroma18[4] = dataarray[0];
			activemenu = 63;
			send("w");							// Get gas pilot info
			return;
		}
		if (activemenu == 63){
			dataarray = data.split(",");
			datafroma18[2] = dataarray[0]/1000;
			datafroma18[3] = dataarray[1];			
			activemenu = 6;
			selectFunction(6);
			return;
		}
		
		if (activemenu == 7){
			dataarray = data.split(",");
			datafroma18[0] = dataarray[0];
			datafroma18[1] = dataarray[1];
			activemenu = 7;
			selectFunction(7);
			return;
		}
		
		if (activemenu == 8){
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
			selectFunction(8);
			return;
		}
		
		if (activemenu == 9){
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

			selectFunction(9);
			return;
		}
		
		if (activemenu == 10){
			socket.emit('base', data);
			activemenu = 10;
			selectFunction(10);
			return;
		}
		if (activemenu == 12 || log_ask  == 1){
			if (log_ask == 0){
				if(log_rows > 0){
					for (var temp = 0;temp<=log_rows;temp++){
						document.getElementById("logitems").deleteRow(-1);
					}
				}
				log_rows = 0;
				log_ask = 1;
				data = "";
				activemenu = 12;
				selectFunction(12);	
				return;
			}
			
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
			datafroma18[12] = dataarray[12];		//
			datafroma18[13] = dataarray[13];		// 
			datafroma18[14] = dataarray[14];
			var temp_show = 1;
			for (var temp2 = 0;temp2<=14;temp2++){
				if (dataarray[temp2] == "undefined"){
					temp_show = 0;
					break;
				}
			}
			if (temp_show == 1){
				var dynatable = document.getElementById("logitems");
				log_rows++;
				var row = dynatable.insertRow(0);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				var cell5 = row.insertCell(4);
				var cell6 = row.insertCell(5);
				var cell7 = row.insertCell(6);
				var cell8 = row.insertCell(7);
				var cell9 = row.insertCell(8);
				cell1.innerHTML = datafroma18[2]+"&nbsp;";
				cell1.classList.add('primary-text-color-minileft');
				var thr = (dataarray[3] < 10) ? "0"+dataarray[3] : dataarray[3];
				var tmn = (dataarray[4] < 10) ? "0"+dataarray[4] : dataarray[4];
				cell2.innerHTML = thr+":"+tmn+"&nbsp;";
				cell2.classList.add('primary-text-color-miniright');
				cell3.innerHTML = datafroma18[5]+"&nbsp;";
				cell3.classList.add('primary-text-color-miniright');
				cell4.innerHTML = datafroma18[6]+"&nbsp;";
				cell4.classList.add('primary-text-color-miniright');
				cell5.innerHTML = datafroma18[7]+"&nbsp;";
				cell5.classList.add('primary-text-color-miniright');
				cell6.innerHTML = (datafroma18[9] == 1) ? "ON"+"&nbsp;" :  "OFF"+"&nbsp;";
				cell6.classList.add('primary-text-color-minicenter');
				cell7.innerHTML = (datafroma18[8] == 1) ? "OPEN"+"&nbsp;" :  "CLOSE"+"&nbsp;";
				cell7.classList.add('primary-text-color-minicenter');
				cell8.innerHTML = (datafroma18[13] == 1) ? "ON"+"&nbsp;" :  "OFF"+"&nbsp;";
				cell8.classList.add('primary-text-color-minicenter');
				cell9.innerHTML = (datafroma18[14] == 1) ? "OPEN" :  "CLOSE";
				cell9.classList.add('primary-text-color-minicenter');
			}
			activemenu = 12;
			return;
		}
		if (activemenu == 13){
			activemenu = 13;
			selectFunction(13);
			return;
		}
		if (activemenu == 14){
			datafroma18[0] = "";
			dataarray = data.split(",");
			for (var temp_num = 0;temp_num<=9;temp_num++){
				if (dataarray[temp_num] <= 9){
//					datafroma18[0] += "0";
//				}else{
					datafroma18[0] += dataarray[temp_num];
				}
			}
			document.getElementById("form_act_num").value = datafroma18[0];
			activemenu = 14;
			selectFunction(14);
			return;
		}
	}

}

function appupdatedb(datatolog)
{
	
	var xmlhttp = new XMLHttpRequest();
    //xmlhttp.onreadystatechange = function() {
   //   if (this.readyState == 4 && this.status == 200) {
   //     document.getElementById("txtHint").innerHTML = this.responseText;
   //   }
   // }
    xmlhttp.open("GET", "appupdate.php?code="+clientcode+"&str="+datatolog, true);
    xmlhttp.send();	
	
}


// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>