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
  players: {}, // socket
  numPlayers: 0
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

  let newPlayer = new Player(socket.id, 1, [], [], 0);

  gameState.players[socket.id] = newPlayer;
  io.emit("getStateServerEmit", { gameState: gameState });
  console.log(gameState.players);

  gameState.numPlayers += 1;
  if (gameState.numPlayers == 2) {
    io.sockets.emit("startGame");
  }

  socket.on("playerMoveClientEmit", data => {
    // define our players
    let player = gameState.players[socket.id];
    let opponent = null;
    Object.keys(gameState.players).forEach(id => {
      if (id !== socket.id) opponent = gameState.players[id];
    });

    // remove a lot of ndoes!
    let index = player.visitedNodes.indexOf(data.currentNode);
    if (index > -1) player.visitedNodes.splice(index, 1);
    index = player.visitedEdges.indexOf(data.edge);
    if (index > -1) player.visitedEdges.splice(index, 1);

    index = opponent.visitedNodes.indexOf(data.currentNode);
    if (index > -1) opponent.visitedNodes.splice(index, 1);
    index = opponent.visitedEdges.indexOf(data.edge);
    if (index > -1) opponent.visitedEdges.splice(index, 1);

    // add visited node and edge
    player.currentNode = data.nextNode;
    player.visitedNodes.push(data.currentNode);
    player.visitedEdges.push(data.edge);

    console.log(gameState);
    io.sockets.emit("getStateServerEmit", { gameState: gameState });
  });

  socket.on("disconnect", () => {
    delete gameState.players[socket.id];
    gameState.numPlayers -= 1;
    console.log(gameState);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
