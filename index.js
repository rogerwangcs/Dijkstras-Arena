const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4000;
const routes = require("./routes/index");

const app = express();
app.use(routes);
const server = http.createServer(app);

const io = socketIo(server); // <- Interesting!

const getApiAndEmit = "TODO";

let lobbyQueue = [];
let gameServer = [];

class Game {
  id = "";
  players = []; // socket
  gameState = {
    players: []
  };
}

class Player {
  constructor(id, currentNode, visitedNodes, visitedEdges, score) {
    this.id = id;
    this.currentNode = currentNode;
    this.visitedNodes = visitedNodes;
    this.visitedEdges = visitedEdges;
    this.score = score;
  }
}

const startGame = players => {
  p1Id = players[0];
  p2Id = players[1];

  let newGame = new Game();
  newGame.players.push(p1Id);
  newGame.players.push(p2Id);
  newGame.id = "game" + p1Id + "-" + p2Id;
  newGame.gameState = {
    players: {
      [p1Id]: new Player(p1Id, 1, [], [], 0),
      [p2Id]: new Player(p2Id, 6, [], [], 0)
    }
  };
  gameServer.push(newGame);

  let p1Socket = io.sockets.connected[p1Id];
  let p2Socket = io.sockets.connected[p2Id];
  p1Socket.join(newGame.id);
  p2Socket.join(newGame.id);

  // emit startgame to game room
  io.to(newGame.id).emit("startGame", newGame);

  // console.log(io.sockets.adapter.rooms);

  console.log("Game " + newGame.id + " started.");
};

const playerQuit = socketId => {
  if (lobbyQueue.indexOf(socketId) != -1) {
    lobbyQueue.splice(lobbyQueue.indexOf(socketId), 1);
  }
  let i = 0;
  gameServer.forEach(game => {
    if (game.players.indexOf(socketId) != -1) {
      console.log("Game " + game.id + " ended.");
      gameServer.splice(i, 1);
      io.to(game.id).emit("endGame", "game ended");
    }
    i += 1;
  });
  console.log("Lobby: " + lobbyQueue.length);
  console.log("GameServer: " + gameServer.length);
};

// Start socket listening
io.on("connection", socket => {
  console.log("Client " + socket.id + " connected");

  // Handle lobby and games
  lobbyQueue.push(socket.id);
  if (lobbyQueue.length >= 2) {
    startGame(lobbyQueue);
    lobbyQueue = [];
  }

  console.log("Lobby: " + lobbyQueue.length);
  console.log("GameServer: " + gameServer.length);

  let newPlayer = new Player(socket.id, 1, [], [], 0);

  // gameState.players[socket.id] = newPlayer;
  // io.emit("getStateServerEmit", { gameState: gameState });
  // console.log(gameState.players);

  // gameState.numPlayers += 1;
  // if (gameState.numPlayers == 2) {
  //   io.sockets.emit("startGame");
  // }

  // socket.on("playerMoveClientEmit", data => {
  //   // define our players
  //   let player = gameState.players[socket.id];
  //   let opponent = null;
  //   Object.keys(gameState.players).forEach(id => {
  //     if (id !== socket.id) opponent = gameState.players[id];
  //   });

  //   // remove a lot of ndoes!
  //   let index = player.visitedNodes.indexOf(data.currentNode);
  //   if (index > -1) player.visitedNodes.splice(index, 1);
  //   index = player.visitedEdges.indexOf(data.edge);
  //   if (index > -1) player.visitedEdges.splice(index, 1);

  //   index = opponent.visitedNodes.indexOf(data.currentNode);
  //   if (index > -1) opponent.visitedNodes.splice(index, 1);
  //   index = opponent.visitedEdges.indexOf(data.edge);
  //   if (index > -1) opponent.visitedEdges.splice(index, 1);

  //   // add visited node and edge
  //   player.currentNode = data.nextNode;
  //   player.visitedNodes.push(data.currentNode);
  //   player.visitedEdges.push(data.edge);

  //   console.log(gameState);
  //   io.sockets.emit("getStateServerEmit", { gameState: gameState });
  // });

  socket.on("disconnect", () => {
    playerQuit(socket.id);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
