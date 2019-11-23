export default {
  nodes: [
    {
      id: 1,
      label: "S1 0",
      font: { face: "Monospace", align: "center", marginTop: "-10px" },
      dist: 0
    },
    { id: 2, label: "b 0", dist: 0 },
    { id: 3, label: "c 0", dist: 0 },
    { id: 4, label: "d 0", dist: 0 },
    { id: 5, label: "e 0", dist: 0 },

    { id: 15, label: "X 0", dist: 0 },

    { id: 6, label: "S2 0", dist: 0 },
    { id: 7, label: "b 0", dist: 0 },
    { id: 8, label: "c 0", dist: 0 },
    { id: 9, label: "d 0", dist: 0 },
    { id: 10, label: "e 0", dist: 0 }
  ],
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
