import React, { Component } from "react";
import Graph from "vis-react";
import GameOverlay from "../components/GameOverlay";
import graphOptions from "../utils/graphOptions";
import defaultGraph from "../utils/defaultGraph";
// import dijkstras from "../utils/dijkstras";

const colors = {
  localNode: "blue",
  localVisited: "teal",
  remoteNode: "red",
  remoteVisited: "pink",
  normal: "gray"
};

var events = {
  select: function(event) {
    var { nodes, edges } = event;
  }
};

class SinglePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerId: null,
      opponentId: null,
      gameState: null,
      network: null,
      currentNode: 1,
      startNode: 1,
      endNode: 15,
      score: 0
    };
  }

  // code runs right as graph loads
  componentDidMount = () => {
    this.props.socket.on("getStateServerEmit", data => {
      console.log("recieved game state!");
      this.setState({ gameState: data.gameState }, () => {
        console.log(data.gameState);

        //Set playerId
        this.setState({ playerId: this.props.socket.id });
        // Set opponentId
        Object.keys(this.state.gameState.players).forEach(player => {
          if (player !== this.state.playerId)
            this.setState({ opponentId: player });
        });
        setTimeout(() => this.renderGraph(data.gameState), 10);
      });
    });
  };

  componentDidUpdate = () => {
    const net = this.state.network;
    if (net == null) return;

    // Handles Click in Graph
    this.handleClick({ nodes: Object });
    this.state.network.on("click", obj => {
      this.handleClick(obj);
    });

    // remove graph colors
    // this.renderGraph();
  };

  handleClick = obj => {
    // destructure
    const net = this.state.network;
    if (net == null) return;

    // get rid of annoying built in select
    net.unselectAll();
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
    let traversedEdge = null;
    edges.forEach(edgeId => {
      const edge = this.state.network.body.edges[edgeId];
      const node1 = edge.fromId;
      const node2 = edge.toId;

      if (
        (node1 === this.state.currentNode && node2 === nextNodeId) ||
        (node2 === this.state.currentNode && node1 === nextNodeId)
      ) {
        traversedEdge = edge.fromId + "-" + edge.toId;
        const weight = edge.options.value;
        newState.score += weight;
      }
    });

    // Send state to server
    this.sendPlayerMove(nextNodeId, this.state.currentNode, traversedEdge);

    // Update local state
    newState.currentNode = nextNodeId;
    this.setState(newState);
  };

  // send player move to server
  sendPlayerMove = (nextNode, currentNode, edge) => {
    this.props.socket.emit("playerMoveClientEmit", {
      nextNode: nextNode,
      currentNode: currentNode,
      edge: edge
    });
  };

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
    node.options.size = 15;
  };

  /**
   * nodeId str, color: str
   * Color edges around given node
   */
  selectEdges = (nodeId, color) => {
    let edges = this.state.network.getConnectedEdges(nodeId);
    edges.forEach(edgeId => {
      let edge = this.state.network.body.edges[edgeId];
      console.log(edge);
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
      node.options.size = 15;
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
    console.log(data);
  };
  getNodes = data => {
    console.log(data);
  };

  dijkstras = (vertices, edges, u, v) => {};

  render() {
    // Makes sure client has received gamestate and also has setstate into state
    if (this.state.playerId == null) return <div>Loading...</div>;
    return (
      <div className="App">
        <p>
          You: {this.state.playerId}, Score:
          {this.state.gameState.players[this.state.opponentId]["score"]}
        </p>
        <p>Opponent: {this.state.opponentId}</p>
        <Graph
          style={{ width: "100%", height: "100%", border: "1px black solid" }}
          graph={defaultGraph}
          options={graphOptions}
          events={events}
          getNetwork={this.getNetwork}
          getEdges={this.getEdges}
          getNodes={this.getNodes}
          vis={vis => (this.vis = vis)}
        />
        <GameOverlay getAdjNodes={this.getAdjNodes} />
      </div>
    );
  }
}

export default SinglePlayer;
