const express = require("express");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) =>{

  console.log("user connected", socket.id);

  socket.on("chat message", (msg) =>{
    io.emit("chat message", {id: socket.id, msg: msg});
  });

  socket.on("disconnect", () =>{
    console.log("user disconnect:",socket.id);
  })
});

const port = process.env.PORT || 3000;

http.listen(port, () =>{
  console.log("Server running at http://localhost:" + port);
});
