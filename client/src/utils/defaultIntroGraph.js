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
    { id: "F", label: "F", font: font },
    { id: "G", label: "G", font: font },
    { id: "H", label: "H", font: font },
    { id: "I", label: "I", font: font },
    { id: "FIN", label: "FIN", font: font }
  ],
  edges: [
    { from: "A", to: "B", label: 4 },
    { from: "B", to: "C", label: 1 },
    { from: "A", to: "C", label: 2 },
    { from: "C", to: "D", label: 8 },
    { from: "B", to: "D", label: 5 },
    { from: "C", to: "E", label: 10 },
    { from: "D", to: "FIN", label: 6 },
    { from: "D", to: "E", label: 2 },
    { from: "B", to: "F", label: 1 },
    { from: "C", to: "G", label: 2 },
    { from: "D", to: "H", label: 3 },
    { from: "E", to: "I", label: 4 },
    { from: "E", to: "FIN", label: 5 }
  ]
};
