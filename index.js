var express = require('express');
var readline = require('readline');
var top = 0;
var left = 0;
var fails = 0;
var joins = 0;

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

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
	socket.on('msg', function(message) {
		io.emit("newmsg", message);
	});
	socket.on('botplz',function(){
		if(fails == 0){
		bot();
	}
	});
});
http.listen(3000, function() {
	console.log('listening on 3000');
});
setInterval(function() {
	io.emit("sprucebot", "Sprucebot details\ntop: " + top + " | left: " + left + " | fails: " + fails + " | joins: " + joins);
}, 100);
setInterval(main, 10);
function main() {
	joins += Math.random();
	console.clear();
	//console.log("top: " + top + " | left: " + left + " | fails: " + fails + " | joins: " + joins);
	if(fails == 0){
		if (joins > 600) {
			bot();
		}
	}
}
function bot() {
	joins = 0;
	if (fails > 500) {
		top = 0;
		left = 0;
		fails = 0;
		joins = 0;
		console.log("Sprucebot disconnected.");
		io.emit("newmsg", "Sprucebot disconnected.");
	}
	else {
		if (top < 1) {
			top += Math.random() * 100;
		}
		else {
			top += Math.random() * 100;
			top -= Math.random() * 100;
		}
		if (left < 1) {
			left += Math.random() * 100;
		}
		else {
			left += Math.random() * 100;
			left -= Math.random() * 100;
		}
		if (left > 800) {
			left -= Math.random() * 100;
		}
		if (top > 800) {
			top -= Math.random() * 100;
		}
		fails += Math.random();
		let date_ob = new Date();
		let date = ("0" + date_ob.getDate()).slice(-2);
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		let year = date_ob.getFullYear();
		let hours = date_ob.getHours();
		let minutes = date_ob.getMinutes();
		let seconds = date_ob.getSeconds();
		io.emit("player", "<a><div class='sprucebot' id='player2' style='-moz-border-radius: 60px; -webkit-border-radius: 60px; border-radius: 60px;color: red; text-align: center;font-family: \"Comic Sans MS\", \"Comic Sans\", Helvetica;color: rgb(181, 16, 16);top: " + top + "px;left: " + left + "px;position: absolute;background-color: rgb(78, 91, 207);border: 5px solid rgb(209, 219, 59);width: 100px;height: 100px'><br>sprucebot</div><div id='time' style='display: none'>" + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + "</div><a/>");
		setTimeout(bot, 100);
	}
}
