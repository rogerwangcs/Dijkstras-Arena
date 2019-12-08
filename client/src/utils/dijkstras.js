import { PriorityQueue } from "./PriorityQueue.js";

const createAdjListGraph = graphObj => {
  console.log(graphObj);
  let adjList = {};
  graphObj.nodes.forEach(node => {
    adjList[node.id] = [];
  });
  console.log(adjList);
  graphObj.edges.forEach(edge => {
    console.log(edge);
    adjList[edge.from].push({ node: edge.to, weight: edge.label });
    adjList[edge.to].push({ node: edge.from, weight: edge.label });
  });
  return adjList;
};

const dijkstrasAlgorithm = (graph, startNode) => {
  let adjList = createAdjListGraph(graph);
  let distances = {};
  // console.log(adjList);

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
  let allPQ = [];
  let allPrev = [];

  while (!pq.isEmpty()) {
    allDistances.push(JSON.parse(JSON.stringify(distances)));
    allPQ.push(JSON.parse(JSON.stringify(pq.container)));
    allPrev.push(JSON.parse(JSON.stringify(prev)));
    let minNode = pq.dequeue();
    let currNode = minNode.data;
    let weight = minNode.priority;
    console.log(adjList[currNode]);
    console.log(currNode);
    console.log(minNode);
    adjList[currNode].forEach(neighbor => {
      let alt = distances[currNode] + neighbor.weight;
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
        prev[neighbor.node] = currNode;
        if (!pq.contain(neighbor.node)) {
          pq.enqueue(neighbor.node, distances[neighbor.node]);
        } else {
          pq.update(neighbor.node, alt);
        }
        allDistances.push(JSON.parse(JSON.stringify(distances)));
        allPQ.push(JSON.parse(JSON.stringify(pq.container)));
        allPrev.push(JSON.parse(JSON.stringify(prev)));
      }
    });
  }
  // allDistances.push(JSON.parse(JSON.stringify(distances)));
  // allPQ.push(JSON.parse(JSON.stringify(pq.container)));
  // allPrev.push(JSON.parse(JSON.stringify(prev)));
  let data = {
    allDistances: allDistances,
    allPQ: allPQ,
    allPrev: allPrev,
    finalDistances: distances
  };
  return data;
};

export default dijkstrasAlgorithm;
