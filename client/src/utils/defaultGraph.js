let font = { vadjust: -40 };

export default {
  nodes: [
    {
      id: 1,
      label: 0,
      font: font
    },
    { id: 2, label: Infinity, font: font },
    { id: 3, label: Infinity, font: font },
    { id: 4, label: Infinity, font: font },
    { id: 5, label: Infinity, font: font },

    { id: 15, label: Infinity, font: font },

    { id: 6, label: Infinity, font: font },
    { id: 7, label: Infinity, font: font },
    { id: 8, label: Infinity, font: font },
    { id: 9, label: Infinity, font: font },
    { id: 10, label: Infinity, font: font }
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
