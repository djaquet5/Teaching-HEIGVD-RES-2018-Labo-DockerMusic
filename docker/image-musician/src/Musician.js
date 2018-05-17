// We use a standard Node.js module to work with UDP
var dgram = require('dgram');
const uuid = require('uuid/v1');

// Let's create a datagram socket. We will use it to send our UDP datagrams
var socket = dgram.createSocket('udp4');
var protocol = {port: 2205, address: "239.255.22.5"};

function getSound(instrument){
    switch(instrument){
        case "piano":
            return "ti-ta-ti";

        case "trumpet":
            return "pouet";

        case "flute":
            return "trulu";

        case "violin":
            return "gzi-gzi";

        case "drum":
            return "boum-boum";

        default:
            return -1;
    }
}

// Create the musician with an unique ID and his sound
var musician = {uuid: uuid(), sound: getSound(process.argv[2])};

// Send the musician sound every second
var payload = JSON.stringify(musician);
message = new Buffer(payload);

setInterval(function() {
    socket.send(message, 0, message.length, protocol.port, protocol.address, function(err, bytes){
        console.log("Sending payload: " + payload + " via port " + socket.address().port);
    });
}, 1000);
