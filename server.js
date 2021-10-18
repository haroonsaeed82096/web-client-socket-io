const express = require("express");
const app = express();

const http = require("http");
const path = require("path");

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const formatMessages = require("./messages");
const botName = "ottonova bot";
const userName = "Haroon";

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("/index");
});

io.on("connection", (socket) => {
  socket.emit("message", formatMessages(botName, "Welcome to Chatroom!"));
  socket.broadcast.emit(
    "message",
    formatMessages(botName, userName + " has joined the chat!")
  );

  socket.on("disconnect", (arg) => {
    io.emit("message", formatMessages(botName, userName + " has left"));
  });

  //Listen to chat messages from user
  socket.on("chatMsg", (msg) => {
    io.emit("message", formatMessages(userName, msg));
  });
});

server.listen(3000, () => {
  console.log("Server running on:  3000");
});
