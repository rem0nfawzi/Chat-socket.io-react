const express = require("express");
const app = express();
const socket = require("socket.io");

const server = app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

// Socket setup
const io = socket(server, {
  origin: "http://localhost/3000",
  methods: ["GET", "POST"],
});

// On connection
io.on("connection", socketInstance => {
  console.log("Socket connection made", socketInstance.id);

  socketInstance.on("send-message", data => {
    io.sockets.emit("send-message", data);
  });
});
