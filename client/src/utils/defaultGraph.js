export default {
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
