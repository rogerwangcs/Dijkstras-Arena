export default {
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
