const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
var generateMessage = require('./utils/message');


var app = express();
var server = http.createServer(app);
app.use(express.static(publicPath));
var io = socketIO(server);

io.on('connection', (socket) => {
	console.log("new client connected");

	socket.emit("newMessage",generateMessage.generateMessage("Admin", "welcome"));

	socket.broadcast.emit("newMessage",generateMessage.generateMessage("Admin", "new user joined"));

	socket.on("createMessage", (msg, callback) => {
		console.log("new message created ", msg);
		io.emit("newMessage",generateMessage.generateMessage(msg.from, msg.text));
		callback();
	})

	socket.on('disconnect', (client) => {
		console.log(`client ${client} disconnected`);
	});
});
server.listen(3000, () =>{
	console.log("starting at port " + 3000) ;
})
