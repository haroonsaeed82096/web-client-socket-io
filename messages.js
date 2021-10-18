var today = new Date();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

let formatMessages = (author, text) => {
  return {
    author,
    text,
    time: time,
  };
};

module.exports = formatMessages;
