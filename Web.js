var express = require('express');
var app = express.createServer(
    
    express.static(__dirname + '/public')
);


io = require('socket.io').listen(app);

app.get("/", function (req,res)
{
    res.redirect("/Game.html");
});
app.listen(process.env.PORT);