var dgram = require('dgram');

// Let's create a datagram socket. We will use it to send our UDP datagrams
var protocol = {port: 2205, address: "239.255.22.5"};
var socket = dgram.createSocket('udp4');

socket.bind(protocol.port, function(){
    console.log("Joining multicast group");
    socket.addMembership(protocol.address);
});

socket.on('message', function(msg, source){
    console.log("Data has arrived: " + msg + ". Source IP: " + source.address + ". Source port: " + source.port);
});