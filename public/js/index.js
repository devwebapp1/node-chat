var socket = io();
socket.on('connect', function(){
  console.log("connected to server");

  socket.emit("createMessage",{
    to : 'kfir',
    text : "new message from ron to kfir"
  });

});
socket.on('disconnect', function() {
  console.log("disconnected from server");
});

socket.on('newMessage', function(message) {
  console.log("new message :", message);
});
