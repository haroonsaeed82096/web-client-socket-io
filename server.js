const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//app.use(expressLayouts);
//app.set("view engine", "ejs");

const testHeading = "This is a test heading";

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("/index");
});

io.on("connection", (socket) => {
  console.log("user connected: " + socket.id);
  socket.emit("message", "Welcome to Chatroom!");
  socket.broadcast.emit("message", "A user has joined!");

  socket.on("disconnect", (arg) => {
    io.emit("message", "A user has left"); // world
  });

  //Listen to chat message
  socket.on("chatMsg", (msg) => {
    io.emit("message", msg);
  });
});

server.listen(3000, () => {
  console.log("Server running on:  3000");
});
