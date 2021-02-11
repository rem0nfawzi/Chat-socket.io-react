const express = require("express");
const app = express();
const socket = require("socket.io");

const server = app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

// Socket setup
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

// On connection
io.on("connection", socketInstance => {
  console.log("Socket connection made", socketInstance.id);

  // Listen to new msgs
  socketInstance.on("send-message", data => {
    io.sockets.emit("send-message", data);
  });
});
