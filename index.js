var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('site'));
io.on('connection', function(socket) {
    socket.on('data', function(data1) {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        var data2 = data1.replace("PUT_DATE_HERE", year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
        io.emit("player", data2);
    });
    socket.on('time', function() {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        io.emit("servertime", year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
    });
});
http.listen(3000, function() {
    console.log('listening on 3000');
});