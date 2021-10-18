const chatForm = document.getElementById("chat-form");
const messagesArea = document.querySelector(".messages-area");

const socket = io();

//Message from server
socket.on("message", (message) => {
  outputMessage(message);

  messagesArea.scrollTop = messagesArea.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  socket.emit("chatMsg", msg);

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
    <p class="meta">${message.author} <span>${message.time}</span></p> 
  
    <p class="text">${message.text}</p>`;
  document.querySelector(".messages-area").appendChild(div);
}
