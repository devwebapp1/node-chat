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

//set link with location url
socket.on('newLocationMessage', function(message) {
  console.log("new message :", message);

  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">location</a>');
  a.attr('href',message.url);
  // li.text(`<a href=${message.url}>user location</a>`);
  li.text(`message from : ${message.from}`);
  li.append(a);
  // li.text = `sss`;
  jQuery("#messages").append(li);
});



jQuery('#message-form').on('submit', function (e) {
  console.log("ff");
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});

var send_location = jQuery("#send-location");
send_location.on("click", function(){
  if(!navigator.geolocation){
    return alert('unable to get location');
  }
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });
  }, function(){
    alert("error getting location");
  });













































});
