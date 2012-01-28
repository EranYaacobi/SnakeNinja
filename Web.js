var SENDS_PER_SECOND = 1;
var SEND_INTERVAL = 1000 / SENDS_PER_SECOND;

var express = require('express');
var app = express.createServer(
    express.static(__dirname + '/public')
);

io = require('socket.io').listen(app);

app.get("/", function (req,res) {
    res.redirect("/Game.html");
});

app.listen(process.env.PORT);

var Sockets = [];
var PlayerCount = 0;
var Snakes = [];

var broadcast = function (event, data1, data2, data3) {
    for (var i in Sockets)
	{
		var socket = Sockets[i];
		socket.emit(event, data1, data2, data3);
	}
};

var SendData = function () {
    broadcast('serverdata', Snakes);
};

var FindSnakeIndex = function (ID) {
    for (var i in Snakes) {
        var snake = Snakes[i];
        if (snake.ID == ID)
            return i;
    }
    return -1;
};

var SendLoop = setInterval(SendData, SEND_INTERVAL);

console.log('ready for connections');

io.sockets.on('connection', function (socket) {
    console.log("player connected!");
    socket.PlayerID = PlayerCount++;
    Sockets.push(socket);
    
    socket.emit('joinconfirmed', socket.PlayerID);
    
    socket.on('disconnect', function () {
        var index = FindSnakeIndex(socket.PlayerID);
        Snakes.splice(index, 1);
		for (var i in Sockets)
			if (Sockets[i].PlayerID == socket.PlayerID)
				Sockets.splice(i, 1);
	});
    
    socket.on('playerdata', function (playerdata) {
        var index = FindSnakeIndex(playerdata.ID);
        if (index == -1)
            /** New player */
            Snakes.push(playerdata);
        else
            Snakes[index] = playerdata;
    });
});