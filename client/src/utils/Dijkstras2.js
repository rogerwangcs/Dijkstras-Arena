import { PriorityQueue } from "./PriorityQueue.js";

const graph = {
  nodes: [
    {
      id: 1,
      label: "S1 0",
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

const createAdjListGraph = graphObj => {
  let adjList = {};
  graphObj.nodes.forEach(node => {
    adjList[node.id] = [];
  });
  graphObj.edges.forEach(edge => {
    adjList[edge.from].push({ node: edge.to, weight: edge.label });
    adjList[edge.to].push({ node: edge.from, weight: edge.label });
  });
  return adjList;
};

const dijkstrasAlgorithm = startNode => {
  startNode = 1;

  let adjList = createAdjListGraph(graph);
  let distances = {};

  // Stores the reference to previous nodes
  let prev = {};
  let pq = new PriorityQueue(adjList.length * adjList.length);

  // Set distances to all nodes to be infinite except startNode
  distances[startNode] = 0;
  console.log(distances);
  pq.enqueue(1, 0);
  Object.keys(adjList).forEach(node => {
    if (node != startNode) {
      distances[node] = Infinity;
    }
    prev[node] = null;
  });

  console.log(distances);

  let allDistances = [];

  while (!pq.isEmpty()) {
    let minNode = pq.dequeue();
    let currNode = minNode.data;
    let weight = minNode.priority;
    adjList[currNode].forEach(neighbor => {
      let alt;
      distances[currNode] == Infinity
        ? (alt = neighbor.weight)
        : (alt = distances[currNode] + neighbor.weight);
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
        prev[neighbor.node] = currNode;
        pq.enqueue(neighbor.node, distances[neighbor.node]);
      }
    });
    allDistances.push(distances);
  }
  console.log(allDistances);
  return distances;
};

export default dijkstrasAlgorithm;
