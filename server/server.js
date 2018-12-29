const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
app.use(express.static(publicPath));
var io = socketIO(server);

io.on('connection', (socket) => {
	console.log("new client connected");

	socket.emit("newMessage",{
		from : 'ron',
		text : "new message from ron",
		createdAt : 1212
	});

	socket.on("createMessage", (msg) => {
		console.log("new message created ", msg);
		socket.emit("newMessage",{
			from : msg.from,
			text : msg.text,
			createdAt : new Date().getTime()
		})
	})

	socket.on('disconnect', (client) => {
		console.log(`client ${client} disconnected`);
	});
});
server.listen(3000, () =>{
	console.log("starting at port " + 3000) ;
})
