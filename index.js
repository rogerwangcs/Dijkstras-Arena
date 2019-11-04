const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4000;
const routes = require("./routes/index");

const app = express();
app.use(routes);
const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

const getApiAndEmit = "TODO";

let gameState = {
  players: {} // socket
};

class Player {
  constructor(id, currentNode, visitedNodes, visitedEdges, score) {
    this.id = id;
    this.currentNode = currentNode;
    this.score = score;
    this.visitedNodes = visitedNodes;
    this.visitedEdges = visitedEdges;
  }
}

// Start socket listening
io.on("connection", socket => {
  console.log("New client connected");

  let newPlayer = new Player(socket.id, Math.floor(Math.random() * 10 + 1), 0);
  gameState.players[socket.id] = newPlayer;
  io.emit("getStateServerEmit", { gameState: gameState });
  console.log(gameState.players);

  socket.on("playerMoveClientEmit", data => {
    console.log("Player " + socket.id + " moved to node " + data.node + ".");
    gameState.players[socket.id].currentNode = data.node;
    io.sockets.emit("getStateServerEmit", { gameState: gameState });
    console.log(gameState);
  });

  socket.on("disconnect", () => {
    delete gameState.players[socket.id];
    console.log(gameState);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
