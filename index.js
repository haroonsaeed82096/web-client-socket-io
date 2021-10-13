const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set("view engine", "ejs");

app.get("/home", (req, res) => {
  res.render("home");
});

io.on("connection", (socket) => {
  console.log("user connected: " + socket.id);
});

server.listen(3000, () => {
  console.log("Server running on:  3000");
});
