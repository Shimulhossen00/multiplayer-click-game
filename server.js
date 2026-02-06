const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

// Store players and their scores
let players = {};

io.on("connection", (socket) => {
  console.log("Player connected:", socket.id);

  // Add player
  players[socket.id] = { score: 0 };
  io.emit("players", players);

  // When player clicks button
  socket.on("click", () => {
    players[socket.id].score++;
    io.emit("players", players); // send updated scores to everyone
  });

  // When player disconnects
  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("players", players);
    console.log("Player disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});
