var express = require('express');
var app = express.createServer(
    
    express.static(__dirname + '/public')
);


io = require('socket.io').listen(app)

app.get("/", function (req,res)
{
    res.redirect("/Game.html");
});
app.listen(process.env.PORT);

io.sockets.on('connection', function (socket) {
  socket.emit('test', { hello: 'world' });
  socket.on('test-c', function (data) {
    console.log(data);
    socket.emit('test-s', 'works');
  });
});