import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Graph from "vis-react";
import Lobby from "./Lobby";
import GameOverlay from "../components/GameOverlay";
import graphOptions from "../utils/graphOptions";
import defaultGraph from "../utils/defaultGraph";
// import dijkstras from "../utils/dijkstras";
import io from "socket.io-client";

const socketUrl = process.env.URL;
// const socketUrl = "http://localhost:4000/";
// const socketUrl = "136.167.212.5:4000";

const colors = {
  localNode: "#185fab",
  localVisited: "#66c9ed",
  remoteNode: "#cf4121",
  remoteVisited: "#ff8870",
  normal: "#c3cdde",
  finalNode: "green"
};

var events = {
  select: function(event) {
    var { nodes, edges } = event;
  }
};

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: "",
      gameId: "",
      playerId: null,
      playerName: null,
      opponentId: null,
      gameState: null,
      gameGraph: null,
      network: null,
      currentNode: 1,
      startNode: 1,
      endNode: 15,
      score: 0,
      distances: {},
      moving: false,
      currentWeight: 0
    };
  }

  enterQueue = playerName => {
    this.setState(
      {
        socket: io({
          query: {
            name: playerName
          }
        })
      },
      () => {
        this.activateSockets(playerName);
      }
    );
  };

  // code runs right as graph loads
  activateSockets = playerName => {
    this.state.socket.emit("setName", playerName);

    this.state.socket.on("startGame", game => {
      let gameState = game.gameState;
      // Set opponentId
      let opponentId = "";
      let opponentName = "";
      Object.keys(gameState.players).forEach(player => {
        if (player !== this.state.socket.id) {
          opponentId = player;
          opponentName = gameState.players[player].name;
        }
      });

      this.setState({
        playerName: playerName,
        opponentName: opponentName,
        gameId: game.id,
        gameState: gameState,
        gameGraph: game.gameGraph,
        startNode: gameState.players[this.state.socket.id].currentNode,
        currentNode: gameState.players[this.state.socket.id].currentNode,
        playerId: this.state.socket.id,
        opponentId: opponentId
      });
      setTimeout(() => this.renderGraph(gameState), 10);
    });

    this.state.socket.on("getStateServerEmit", data => {
      let gameState = data.gameState;
      this.setState({
        gameState: gameState,
        currentNode: gameState.players[this.state.socket.id].currentNode
      });
      setTimeout(() => this.renderGraph(gameState), 10);
    });

    this.state.socket.on("endGame", data => {
      this.endGame(data.winner);
    });
  };

  componentWillUnmount = () => {
    if (this.state.socket) {
      this.state.socket.disconnect();
      this.addToMatchHistory(
        "Abandoned ship vs " + this.state.opponentName || "Anonymous"
      );
    }
  };

  componentDidUpdate = () => {
    const net = this.state.network;
    if (net == null) return;

    // Handles Click in Graph
    // Need both to handle client syncing
    this.handleClick({ nodes: Object });
    this.state.network.on("click", obj => {
      this.handleClick(obj);
    });
  };

  handleClick = obj => {
    // destructure
    const net = this.state.network;
    if (net == null) return;

    // get rid of annoying built in select
    net.unselectAll();
    // skip if currently moving
    if (this.state.moving) return;
    // skip if no nodes selected
    if (Object.entries(obj.nodes).length === 0) return;
    // skip if selected node is same as current node
    if (obj.nodes[0] === this.state.currentNode) return;
    // skip if not adjaent node
    let availableNodes = net.getConnectedNodes(this.state.currentNode);
    if (!availableNodes.includes(obj.nodes[0])) return;

    // Make Move
    this.move(obj.nodes[0]);
  };

  move = nextNodeId => {
    // State setup
    const net = this.state.network;
    let newState = this.state;

    //Add edge traversed to score
    const edges = net.getConnectedEdges(nextNodeId);
    let traversedEdgeId;
    let edgeWeight;
    edges.forEach(edgeId => {
      const edge = this.state.network.body.edges[edgeId];
      const node1 = edge.fromId;
      const node2 = edge.toId;

      if (
        (node1 === this.state.currentNode && node2 === nextNodeId) ||
        (node2 === this.state.currentNode && node1 === nextNodeId)
      ) {
        traversedEdgeId = edge.fromId + "-" + edge.toId;
        edgeWeight = edge.options.label;
      }
    });
    // Send state to server
    this.sendPlayerMove(nextNodeId, traversedEdgeId, edgeWeight);

    // wait
    newState.moving = true;
    newState.currentWeight = edgeWeight;
    setTimeout(() => this.setState({ moving: false }), edgeWeight * 400);

    // Update local state
    newState.currentNode = nextNodeId;
    this.setState(newState);
  };

  // send player move to server
  sendPlayerMove = (nextNode, edge, edgeWeight) => {
    this.state.socket.emit("playerMoveClientEmit", {
      gameId: this.state.gameId,
      currentNode: this.state.currentNode,
      score: (this.state.score += edgeWeight),
      nextNode: nextNode,
      edge: edge
    });
  };

  endGame = winner => {
    console.log(winner);
    console.log(!winner);
    if (!winner) {
      this.props.history.push("/");
      return;
    }
    if (this.state.playerId === winner) {
      alert("you win!");
    } else {
      alert("you lose!");
    }
    setTimeout(() => this.props.history.push("/"), 3000);
  };

  addToMatchHistory = result => {
    let matches = JSON.parse(localStorage.getItem("matchHistory"));
    matches.push(result);
    localStorage.setItem("matchHistory", JSON.stringify(matches));
  };

  dijkstras = (vertices, edges, u, v) => {};

  renderGraph = () => {
    this.clearSelection();

    const players = this.state.gameState.players;
    const player = players[this.state.playerId];
    const opponent = players[this.state.opponentId];

    // Highlight opponent visited nodes and edges
    if (opponent.visitedNodes.length !== 0)
      this.selectNodesFromList(opponent.visitedNodes, colors.remoteVisited);
    if (opponent.visitedEdges.length !== 0)
      this.selectEdgesFromList(opponent.visitedEdges, colors.remoteVisited);

    // Highlight local player visited nodes and edges
    if (player.visitedNodes.length !== 0)
      this.selectNodesFromList(player.visitedNodes, colors.localVisited);
    if (player.visitedEdges.length !== 0)
      this.selectEdgesFromList(player.visitedEdges, colors.localVisited);

    // Highlights opponent node and edges
    this.selectNode(opponent.currentNode, colors.remoteNode);
    this.selectEdges(opponent.currentNode, colors.remoteNode);
    // Highlight local player node and edges
    this.selectNode(player.currentNode, colors.localNode);
    this.selectEdges(player.currentNode, colors.localNode);

    // Highlight final node
    let finalNodeId = Math.pow(
      (this.state.gameGraph.nodes.length - 1) / 2 + 1,
      2
    );
    this.selectNode(finalNodeId, colors.finalNode);

    this.forceUpdate();
  };

  clearSelection = () => {
    const nodes = this.state.network.body.nodes;
    Object.keys(nodes).forEach(nodeId => {
      let node = this.state.network.body.nodes[nodeId];
      node.options.size = 25;
      node.options.color.background = colors.normal;
    });

    let edges = this.state.network.body.edges;
    Object.keys(edges).forEach(edgeId => {
      let edge = this.state.network.body.edges[edgeId];
      edge.options.color.color = colors.normal;
      edge.options.width = 5;
    });
  };

  // nodeId: str, color: str
  selectNode = (nodeId, color) => {
    let node = this.state.network.body.nodes[nodeId];
    node.options.color.background = color;
    node.options.size = 20;
    return node;
  };

  /**
   * nodeId str, color: str
   * Color edges around given node
   */
  selectEdges = (nodeId, color) => {
    let edges = this.state.network.getConnectedEdges(nodeId);
    edges.forEach(edgeId => {
      let edge = this.state.network.body.edges[edgeId];
      edge.options.color.color = color;
      edge.options.width = 10;
    });
  };

  getAdjNodes = () => {
    if (this.network == null) {
      setTimeout(() => this.getAdjNodes(), 100);
      return;
    }
    let edges = this.state.network.getConnectedEdges(this.state.currentNode);
    let adjNodes = [];
    edges.forEach(edgeId => {
      let edge = this.state.network.body.edges[edgeId];
      adjNodes.push(edge.toId);
    });
    console.log(adjNodes);
    return adjNodes;
  };

  selectNodesFromList = (nodes, color) => {
    nodes.forEach(nodeId => {
      let node = this.state.network.body.nodes[nodeId];
      node.options.color.background = color;
      node.options.size = 20;
    });
  };

  selectEdgesFromList = (edges, color) => {
    edges.forEach(edgeId => {
      let edge = null;
      Object.values(this.state.network.body.edges).forEach(e => {
        if (e.fromId + "-" + e.toId === edgeId) edge = e;
      });
      edge.options.color.color = color;
      edge.options.width = 10;
    });
  };

  getNetwork = data => {
    this.setState({ network: data });
  };
  getEdges = data => {
    // console.log(data);
  };
  getNodes = data => {
    // console.log(data);
  };

  render() {
    // Makes sure client has received gamestate and also has setstate into state
    if (this.state.playerId == null)
      return <Lobby enterQueue={this.enterQueue} />;
    return (
      <React.Fragment>
        <Graph
          style={{ width: "100%", height: "100%", margin: "0px" }}
          graph={this.state.gameGraph}
          options={graphOptions}
          events={events}
          getNetwork={this.getNetwork}
          getEdges={this.getEdges}
          getNodes={this.getNodes}
          vis={vis => (this.vis = vis)}
        />
        <GameOverlay
          getAdjNodes={this.getAdjNodes}
          moving={this.state.moving}
          currentWeight={this.state.currentWeight}
          data={{
            playerName: this.state.playerName,
            opponentName: this.state.opponentName,
            playerScore: this.state.gameState.players[this.state.playerId][
              "score"
            ],
            opponentScore: this.state.gameState.players[this.state.opponentId][
              "score"
            ]
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(GameContainer);
