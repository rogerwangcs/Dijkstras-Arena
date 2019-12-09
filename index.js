const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4000;
const routes = require("./routes/index");

const app = express();

app.use(express.static(path.join(__dirname, "client/build")));
app.use(routes);
const server = http.createServer(app);
const io = socketIo(server);

const generateGraph = require("./generateGraph");
let lobbyQueue = [];
let lobbyQueueNames = [];
let gameServer = {};

class Game {
  id = "";
  players = []; // socket
  gameSize = 0;
  gameGraph = {};
  gameState = {
    players: []
  };
}

class Player {
  constructor(id, name, currentNode, visitedNodes, visitedEdges, score) {
    this.id = id;
    this.name = name;
    this.currentNode = currentNode;
    this.visitedNodes = visitedNodes;
    this.visitedEdges = visitedEdges;
    this.score = score;
  }
}

const startGame = (players, names) => {
  p1Id = players[0];
  p2Id = players[1];

  let newGame = new Game();
  let gameId = "game" + p1Id + "-" + p2Id;
  newGame.id = gameId;
  newGame.gameSize = Math.floor(Math.random() * 8) + 12;
  newGame.gameGraph = generateGraph(newGame.gameSize);
  newGame.players.push(p1Id);
  newGame.players.push(p2Id);
  newGame.gameState = {
    players: {
      [p1Id]: new Player(p1Id, names[0], 1, [], [], 0),
      [p2Id]: new Player(p2Id, names[1], newGame.gameSize + 1, [], [], 0)
    }
  };
  gameServer[gameId] = newGame;

  let p1Socket = io.sockets.connected[p1Id];
  let p2Socket = io.sockets.connected[p2Id];
  p1Socket.join(gameId);
  p2Socket.join(gameId);

  // emit startgame to game room
  io.to(gameId).emit("startGame", newGame);

  logServerState("Game " + gameId.substring(0, 10) + " started");
  return gameId;
};

const logServerState = message => {
  if (message) {
    console.log("\n======Last Action========================");
    console.log(message);
  }
  console.log("\n=====Server State=====");
  console.log("Lobby: " + lobbyQueue.length);
  console.log("Active Games: " + Object.keys(gameServer).length);
  console.log("======================");
};

const playerQuit = socketId => {
  if (lobbyQueue.indexOf(socketId) != -1) {
    lobbyQueue.splice(lobbyQueue.indexOf(socketId), 1);
    lobbyQueueNames.splice(lobbyQueue.indexOf(socketId), 1);
  }
  let i = 0;
  Object.keys(gameServer).forEach(gameId => {
    if (gameServer[gameId].players.indexOf(socketId) != -1) {
      logServerState("Game " + gameId.substring(0, 10) + " ended");
      delete gameServer[gameId];
      io.to(gameId).emit("endGame", "game ended");
    }
    i += 1;
  });
  logServerState("Client " + socketId.substring(0, 10) + " left.");
};

// Start socket listening
io.on("connection", socket => {
  let name = socket.handshake.query.name;
  // Handle lobby and games
  lobbyQueue.push(socket.id);
  lobbyQueueNames.push(name);
  let gameId = false;
  if (lobbyQueue.length >= 2) {
    gameId = startGame(lobbyQueue, lobbyQueueNames);
    lobbyQueue = [];
    lobbyQueueNames = [];
  }

  logServerState("Client " + socket.id.substring(0, 10) + " joined.");

  socket.on("playerMoveClientEmit", data => {
    if (Object.keys(gameServer).indexOf(data.gameId) < 0) {
      logServerState("Game timed out.");
      io.to(socket.id).emit("endGame");
      return;
    }
    let gameState = gameServer[data.gameId].gameState;

    let inGame = false;
    Object.keys(gameState.players).forEach(playerId => {
      if (socket.id === playerId) inGame = true;
    });
    if (inGame) {
      // define our players
      let player = gameState.players[socket.id];
      let opponent = null;
      Object.keys(gameState.players).forEach(id => {
        if (id !== socket.id) opponent = gameState.players[id];
      });

      // update score
      player.score = data.score;

      // remove nodes!
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

      if (
        player.currentNode === Math.pow(gameServer[data.gameId].gameSize, 2)
      ) {
        io.to(data.gameId).emit("endGame", {
          winner: player.id,
          winnerScore: player.score,
          loserScore: opponent.score
        });
        playerQuit(socket.id);
      }
      io.to(data.gameId).emit("getStateServerEmit", { gameState: gameState });
    }
  });

  socket.on("disconnect", () => {
    playerQuit(socket.id);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
