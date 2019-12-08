let font = { vadjust: -40 };

export default {
  nodes: [
    {
      id: "A",
      label: "A",
      font: font
    },
    { id: "B", label: "B", font: font },
    { id: "C", label: "C", font: font },
    { id: "D", label: "D", font: font },
    { id: "E", label: "E", font: font },
    { id: "FIN", label: "FIN", font: font }
  ],
  edges: [
    { from: "A", to: "B", label: 4 },
    { from: "B", to: "C", label: 1 },
    { from: "A", to: "C", label: 2 },
    { from: "C", to: "D", label: 8 },
    { from: "B", to: "D", label: 5 },
    { from: "C", to: "E", label: 10 },
    { from: "D", to: "E", label: 2 },
    { from: "D", to: "FIN", label: 6 },
    { from: "E", to: "FIN", label: 5 }
  ]
};
