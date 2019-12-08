export default {
  width: "100%",
  height: "100%",
  autoResize: true,
  physics: {
    enabled: true,
    repulsion: {
      nodeDiatance: 100,
      centralGravity: 0.2,
      springLength: 200,
      springConstant: .05,
      damping: 0.09,
    },
  },
  solver: "repulsion",
  nodes: {
    fixed: {
      x: false,
      y: false
    },
    shape: "dot",
    size: 35,
    borderWidth: 1,
    borderWidthSelected: 3,
    color: {
      border: "white"
    },
    font: {
      size: 25,
      align: "center"
    }
  },
  edges: {
    width: 5,
    color: {
      color: "#D3D3D3",
      highlight: "#797979",
      hover: "#797979",
      opacity: 0.75
    },
    font: {
      size: 25,
      strokeWidth: 10
    },
    arrows: {
      to: { enabled: false, scaleFactor: 1, type: "arrow" },
      from: { enabled: false, scaleFactor: 1, type: "arrow" }
    }
  },
  interaction: {
    dragNodes: true,
    dragView: true,
    zoomView: true,
    selectConnectedEdges: false
  }
};
