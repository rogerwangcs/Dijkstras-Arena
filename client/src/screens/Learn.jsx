import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Graph from "vis-react";
import graphOptions from "../utils/graphOptions";
import defaultGraph from "../utils/defaultGraph";
import GameOverlayLearn from "../components/GameOverlayLearn";
import dijkstra from "../utils/dijkstras";

const colors = {
  localNode: "#185fab",
  localVisited: "#66c9ed",
  normal: "#c3cdde",
  highlighted: "#36EEE2"
};

class Learn extends Component {
  constructor(props) {
    super(props);

    let dijkstras = dijkstra(defaultGraph, "A");

    this.state = {
      visitedNodes: [],
      visitedEdges: [],
      network: null,
      currentNode: "A",
      endNode: "FIN",
      score: 0,
      shortestPaths: {},
      distances: dijkstras.finalDistances,
      allDistances: dijkstras.allDistances,
      allPQ: dijkstras.allPQ,
      step: 0,
      currentWeight: 0,
      exploreOptions: [
        { node: "A", weight: 3 },
        { node: "B", weight: 2 },
        { node: "C", weight: 4 }
      ]
    };
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.renderGraph();
    }, 50);
  };

  componentDidUpdate = () => {
    // Handles Click in Graph
    // Need both to handle client syncing
    this.handleClick({ nodes: Object });
    this.state.network.on("click", obj => {
      this.handleClick(obj);
    });
  };

  step = () => {
    if (this.state.step < this.state.allPQ.length - 1) {
      this.setState({ step: this.state.step + 1 }, () => this.renderGraph());
    }
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
        newState.score += edgeWeight;
      }
    });

    // add to visited nodes and edges
    let index = this.state.visitedNodes.indexOf(this.state.currentNode);
    if (index === -1) newState.visitedNodes.push(newState.currentNode);
    index = this.state.visitedEdges.indexOf(traversedEdgeId);
    if (index === -1) newState.visitedEdges.push(traversedEdgeId);

    // Update local state
    newState.currentNode = nextNodeId;
    this.setState(newState, () => this.renderGraph());
  };

  renderGraph = () => {
    this.clearSelection();

    // Highlight local player visited nodes and edges
    if (this.state.visitedNodes.length !== 0)
      this.selectNodesFromList(this.state.visitedNodes, colors.localVisited);
    if (this.state.visitedEdges.length !== 0)
      this.selectEdgesFromList(this.state.visitedEdges, colors.localVisited);

    // Highlight local player node and edges
    this.selectNode(this.state.currentNode, colors.localNode);
    this.selectEdges(this.state.currentNode, colors.localNode);

    this.state.allPQ[this.state.step].forEach(node => {
      this.selectNode(node.data, colors.highlighted);
    });
    // this.selectNode(
    //   this.state.allPQ[this.state.step][0].data,
    //   colors.highlighted
    // );

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
    return (
      <React.Fragment>
        <Graph
          style={{ width: "100%", height: "100%", margin: "0px" }}
          graph={defaultGraph}
          options={graphOptions}
          getNetwork={this.getNetwork}
          getEdges={this.getEdges}
          getNodes={this.getNodes}
          vis={vis => (this.vis = vis)}
        />
        <GameOverlayLearn
          score={this.state.score}
          allDistances={this.state.allDistances}
          allPQ={this.state.allPQ}
          step={this.state.step}
          stepFn={this.step}
          exploreOptions={this.state.exploreOptions}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(Learn);
