import { PriorityQueue } from "./PriorityQueue.js";

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

const dijkstrasAlgorithm = (graph, startNode) => {
  let adjList = createAdjListGraph(graph);
  let distances = {};

  // Stores the reference to previous nodes
  let prev = {};
  let pq = new PriorityQueue(adjList.length * adjList.length);

  // Set distances to all nodes to be infinite except startNode
  distances[startNode] = 0;
  pq.enqueue(startNode, 0);
  Object.keys(adjList).forEach(node => {
    if (node != startNode) {
      distances[node] = Infinity;
    }
    prev[node] = null;
  });

  let allDistances = [];

  while (!pq.isEmpty()) {
    let minNode = pq.dequeue();
    let currNode = minNode.data;
    let weight = minNode.priority;
    adjList[currNode].forEach(neighbor => {
      let alt;
      distances[currNode] === Infinity
        ? (alt = neighbor.weight)
        : (alt = distances[currNode] + neighbor.weight);
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
        prev[neighbor.node] = currNode;
        pq.enqueue(neighbor.node, distances[neighbor.node]);
        allDistances.push(distances);
        console.log(JSON.parse(JSON.stringify(distances)));
      }
    });
  }
  console.log(allDistances);
  return distances;
};

export default dijkstrasAlgorithm;
