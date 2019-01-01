var socket = io();
socket.on('connect', function(){
  console.log("connected to server");

  // socket.emit("createMessage",{
  //   to : 'kfir',
  //   text : "new message from ron to kfir"
  // });

});
socket.on('disconnect', function() {
  console.log("disconnected from server");
});

socket.on('newMessage', function(message) {
  console.log("new message :", message);

  var li = jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);
  // li.text = `sss`;
  jQuery("#messages").append(li);
});

// socket.emit("createMessage", {
//   from : "ACK",
//   text : "test ack"
// }, function() {
//   console.log("received ack from server");
// });


jQuery('#message-form').on('submit', function (e) {
  console.log("ff");
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
