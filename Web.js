var express = require('express');
var app = express.createServer(
    
    express.static(__dirname + '/public')
);

app.get("/", function (req,res)
{
    res.redirect("/Game.html");
});
app.listen(process.env.PORT);
