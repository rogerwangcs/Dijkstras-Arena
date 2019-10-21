import React, { Component } from "react";
import Graph from "vis-react";

let graph = {
  nodes: [
    { id: 1, label: "a" },
    { id: 2, label: "b" },
    { id: 3, label: "c" },
    { id: 4, label: "d" },
    { id: 5, label: "e" },

    { id: 15, label: "z" },

    { id: 6, label: "A" },
    { id: 7, label: "B" },
    { id: 8, label: "C" },
    { id: 9, label: "D" },
    { id: 10, label: "E" }
  ],
  edges: [
    { from: 1, to: 2, label: 4, value: 4 },
    { from: 2, to: 3, label: 1, value: 1 },
    { from: 1, to: 3, label: 2, value: 2 },
    { from: 3, to: 4, label: 8, value: 8 },
    { from: 2, to: 4, label: 5, value: 5 },
    { from: 3, to: 5, label: 10, value: 10 },
    { from: 4, to: 15, label: 6, value: 6 },
    { from: 4, to: 5, label: 2, value: 2 },
    { from: 5, to: 15, label: 5, value: 5 },

    { from: 6, to: 7, label: 4, value: 4 },
    { from: 7, to: 8, label: 1, value: 1 },
    { from: 6, to: 8, label: 2, value: 2 },
    { from: 8, to: 9, label: 8, value: 8 },
    { from: 7, to: 9, label: 5, value: 5 },
    { from: 8, to: 10, label: 10, value: 10 },
    { from: 9, to: 15, label: 6, value: 6 },
    { from: 9, to: 10, label: 2, value: 2 },
    { from: 10, to: 15, label: 5, value: 5 }
  ]
};

var options = {
  width: "100%",
  height: "800px",
  layout: {
    improvedLayout: true
  },
  nodes: {
    fixed: {
      x: false,
      y: false
    },
    shape: "dot",
    size: 13,
    borderWidth: 1.5,
    borderWidthSelected: 2,
    font: {
      size: 15,
      align: "center",
      bold: {
        color: "#bbbdc0",
        size: 15,
        vadjust: 0,
        mod: "bold"
      }
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
    dragView: false,
    dragNodes: false,
    zoomView: false
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
    this.state = { network: null };
  }

  componentDidUpdate = () => {
    this.state.network.selectNodes([2], [true]);

    this.state.network.on("click", params => {
      console.log(params);
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
          // style={style}
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
