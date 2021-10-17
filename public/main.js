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

  document.getElementById("msg").value = "";
});

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="text">${message}</p>`;
  document.querySelector(".messages-area").appendChild(div);
}
