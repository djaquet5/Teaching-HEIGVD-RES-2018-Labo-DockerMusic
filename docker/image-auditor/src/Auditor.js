var dgram = require('dgram');
var net = require('net');

// Let's create a datagram socket. We will use it to send our UDP datagrams
var protocol = {port: 2205, address: "239.255.22.5"};
var socket = dgram.createSocket('udp4');

function getInstrument(sound){
    switch(sound){
        case "ti-ta-ti":
            return "piano";

        case "pouet":
            return "trumpet";

        case "trulu":
            return "flute";

        case "gzi-gzi":
            return "violin";

        case "boum-boum":
            return "drum";

        default:
            return -1;
    }
}

socket.bind(protocol.port, function(){
    console.log("Joining multicast group");
    socket.addMembership(protocol.address);
});

var activeMuscians = [];
var musicians = new Map();

socket.on('message', function(msg, source){
    var musicianReceived = JSON.parse(msg);

    if(!musicians.has(musicianReceived.uuid)){
        var currentDate = new Date();
        var activateDate = currentDate.getFullYear() + "-" +
                           currentDate.getMonth() + "-" +
                           currentDate.getDay() + "T" +
                           currentDate.getHours() + ":" +
                           currentDate.getMinutes() + ":" +
                           currentDate.getSeconds() + "." +
                           currentDate.getMilliseconds() + "Z";

        musicians.set(musicianReceived.uuid, {
            uuid: musicianReceived.uuid,
            instrument: getInstrument(musicianReceived.sound),
            activeSince: activateDate,
            active: true
        });
    } else {
        musicians.get(musicianReceived.uuid).active = true;
    }
});

setInterval(function(){
    // Don't care about the lasts active musicians, we init the array and add all active musicians
    activeMusicians = [];

    musicians.forEach(function (musician, key, map){
        if(musician.active){
            activeMuscians.add(musician);
            musician.active = false;
        }
    });

    console.log(JSON.stringify(activeMuscians));

}, 4000);

// TCP Server
var server = net.createServer(function(socket){
    var payload = JSON.stringify(activeMusician);
    socket.write(payload + "\r\n");
    socket.pipe(socket);
    socket.end();
});

server.listen(2205, '0.0.0.0');

