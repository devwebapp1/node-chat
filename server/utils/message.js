var generateMessage = (from, text) => {
  return {
    from ,
    text ,
    createdAt : new Date().getTime()
  };
};
var generateLocationMessage = (from, latitude, longittued) => {
  return {
    from ,
    url : `https://www.google.com/maps?q=${latitude},${longittued}` ,
    createdAt : new Date().getTime()
  };
};

module.exports.generateMessage = generateMessage;
module.exports.generateLocationMessage = generateLocationMessage;
