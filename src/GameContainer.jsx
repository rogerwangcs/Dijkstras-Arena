import React, { Component } from "react";
import Graph from "vis-react";

const colors = {
  selected: "lightblue",
  normal: "gray"
};

let graph = {
  nodes: [
    { id: 1, label: "START" },
    { id: 2, label: "b" },
    { id: 3, label: "c" },
    { id: 4, label: "d" },
    { id: 5, label: "e" },

    { id: 15, label: "END" },

    { id: 6, label: "START" },
    { id: 7, label: "b" },
    { id: 8, label: "c" },
    { id: 9, label: "d" },
    { id: 10, label: "e" }
  ],
  // edges: [
  //   { from: 1, to: 2, label: 4, value: 4 },
  //   { from: 2, to: 3, label: 1, value: 1 },
  //   { from: 1, to: 3, label: 2, value: 2 },
  //   { from: 3, to: 4, label: 8, value: 8 },
  //   { from: 2, to: 4, label: 5, value: 5 },
  //   { from: 3, to: 5, label: 10, value: 10 },
  //   { from: 4, to: 15, label: 6, value: 6 },
  //   { from: 4, to: 5, label: 2, value: 2 },
  //   { from: 5, to: 15, label: 5, value: 5 },

  //   { from: 6, to: 7, label: 4, value: 4 },
  //   { from: 7, to: 8, label: 1, value: 1 },
  //   { from: 6, to: 8, label: 2, value: 2 },
  //   { from: 8, to: 9, label: 8, value: 8 },
  //   { from: 7, to: 9, label: 5, value: 5 },
  //   { from: 8, to: 10, label: 10, value: 10 },
  //   { from: 9, to: 15, label: 6, value: 6 },
  //   { from: 9, to: 10, label: 2, value: 2 },
  //   { from: 10, to: 15, label: 5, value: 5 }
  // ],
  edges: [
    { from: 1, to: 2, label: 4 },
    { from: 2, to: 3, label: 1 },
    { from: 1, to: 3, label: 2 },
    { from: 3, to: 4, label: 8 },
    { from: 2, to: 4, label: 5 },
    { from: 3, to: 5, label: 10 },
    { from: 4, to: 15, label: 6 },
    { from: 4, to: 5, label: 2 },
    { from: 5, to: 15, label: 5 },

    { from: 6, to: 7, label: 4 },
    { from: 7, to: 8, label: 1 },
    { from: 6, to: 8, label: 2 },
    { from: 8, to: 9, label: 8 },
    { from: 7, to: 9, label: 5 },
    { from: 8, to: 10, label: 10 },
    { from: 9, to: 15, label: 6 },
    { from: 9, to: 10, label: 2 },
    { from: 10, to: 15, label: 5 }
  ]
};

var options = {
  // configure: { enabled: true },
  width: "100%",
  height: "400px",
  layout: {
    improvedLayout: true
  },
  nodes: {
    fixed: {
      x: false,
      y: false
    },
    shape: "dot",
    size: 25,
    borderWidth: 1,
    borderWidthSelected: 3,
    font: {
      size: 15,
      align: "center"
    }
  },
  edges: {
    width: 5,
    color: {
      color: "#D3D3D3",
      highlight: "#797979",
      hover: "#797979",
      opacity: 1.0
    },
    arrows: {
      to: { enabled: false, scaleFactor: 1, type: "arrow" },
      from: { enabled: false, scaleFactor: 1, type: "arrow" }
    }
  },
  interaction: {
    dragNodes: false,
    dragView: false,
    zoomView: false,
    selectConnectedEdges: false
  }
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
      network: null,
      currentNode: 1,
      score: 0
    };
  }

  // code runs right as graph loads
  componentDidMount = () => {
    setTimeout(() => {
      this.clearSelection();
      this.selectNode(this.state.currentNode, colors.selected);
      this.selectEdges(this.state.currentNode, colors.selected);
    }, 25);
  };

  componentDidUpdate = () => {
    // Handles Click in Graph
    this.handleClick({ nodes: Object });
    this.state.network.on("click", obj => {
      this.handleClick(obj);
    });
  };

  handleClick = obj => {
    // destructure
    const net = this.state.network;
    // get rid of annoying built in select
    net.unselectAll();
    // skips if no nodes selected
    if (Object.entries(obj.nodes).length === 0) return;
    // skip if selected node is same as current node
    if (obj.nodes[0] === this.state.currentNode) return;

    // State setup
    let newState = this.state;
    let nextNodeId = obj.nodes[0];

    //Add edge traversed to score
    const edges = net.getConnectedEdges(nextNodeId);
    edges.forEach(edgeId => {
      const edge = this.state.network.body.edges[edgeId];
      const node1 = edge.from.id;
      const node2 = edge.to.id;

      // console.log(node1 + " " + node2);
      // console.log(this.state.currentNode + " " + nextNodeId);
      if (
        (node1 === this.state.currentNode && node2 === nextNodeId) ||
        (node2 === this.state.currentNode && node1 === nextNodeId)
      ) {
        const weight = edge.options.value;
        newState.score += weight;
      }
    });

    // Select next node THIS MUST GO LAST
    let availableNodes = net.getConnectedNodes(this.state.currentNode);
    if (availableNodes.includes(nextNodeId)) {
      // this.selectNode(newState.currentNode, "black");
      // this.selectNode(id, "red");
      // this.selectEdges(this.state.currentNode, "red");
      newState.currentNode = nextNodeId;
      this.setState(newState, () => console.log(this.state));
    }

    // render colors
    this.clearSelection();
    this.selectNode(this.state.currentNode, colors.selected);
    this.selectEdges(this.state.currentNode, colors.selected);
  };

  clearSelection = () => {
    const nodes = this.state.network.body.nodes;
    Object.keys(nodes).forEach(nodeId => {
      let node = this.state.network.body.nodes[nodeId];
      node.options.size = 20;
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
    node.options.size = 25;
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

  getNetwork = data => {
    this.setState({ network: data });
  };
  getEdges = data => {
    console.log(data);
  };
  getNodes = data => {
    console.log(data);
  };

  render() {
    return (
      <div>
        <Graph
          style={{ margin: "25px", width: "100%", border: "1px black solid" }}
          graph={graph}
          options={options}
          events={events}
          getNetwork={this.getNetwork}
          getEdges={this.getEdges}
          getNodes={this.getNodes}
          vis={vis => (this.vis = vis)}
        />
      </div>
    );
  }
}

export default GameContainer;
