var express = require('express');
console.log(__dirname);
var app = express.createServer(
    express.logger(),
    express.static(__dirname + '/public')
);
app.get("/", function (req,res)
{
    res.send("hello world !!!"); 
});
app.listen(process.env.PORT);
