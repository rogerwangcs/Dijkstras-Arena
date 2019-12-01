const generateGraph = size => {
  let graph = {
    nodes: [],
    edges: []
  };

  let font = { vadjust: -40 };

  for (let i = 1; i < size; i++) {
    graph.nodes.push({
      id: i,
      label: String.fromCharCode(96 + i),
      font: font
    });
    graph.nodes.push({
      id: i + size,
      label: String.fromCharCode(64 + i),
      font: font
    });

    if (i >= 2) {
      let weight = Math.floor(Math.random() * 10) + 1;
      graph.edges.push({
        from: i - 1,
        to: i,
        label: weight
      });
      graph.edges.push({
        from: i - 1 + size,
        to: i + size,
        label: weight
      });

      if (Math.random() < 0.5) {
        weight = Math.floor(Math.random() * 10) + 1;
        graph.edges.push({
          from: i - 2,
          to: i,
          label: weight
        });
        graph.edges.push({
          from: i - 2 + size,
          to: i + size,
          label: weight
        });
      }

      // cross edges between two player's graphs
      if (Math.random() < 0.35) {
        weight = Math.floor(Math.random() * 2) + 1;
        graph.edges.push({
          from: i,
          to: i + size,
          label: weight
        });
      }
    }

    if (i >= 3 && Math.random() < 0.5) {
      let weight = Math.floor(Math.random() * 10) + 1;
      graph.edges.push({
        from: i - 3,
        to: i,
        label: weight
      });
      graph.edges.push({
        from: i - 3 + size,
        to: i + size,
        label: weight
      });
    }
  }

  let weight = Math.floor(Math.random() * 10) + 1;
  graph.nodes.push({
    id: size * size,
    label: "FIN",
    font: font
  });
  graph.edges.push({
    from: size - 1,
    to: size * size,
    label: weight
  });
  graph.edges.push({
    from: size - 1 + size,
    to: size * size,
    label: weight
  });

  console.log(size * size);
  return graph;
};

module.exports = generateGraph;
