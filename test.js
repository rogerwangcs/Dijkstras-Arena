const dijkstrasAlgorithm = (graph, startNode) => {
  let adjList = createAdjListGraph(graph);

  let prev = {};
  let pq = new PriorityQueue(adjList.length * adjList.length);

  distances[startNode] = 0;
  pq.enqueue(startNode, 0);
  Object.keys(adjList).forEach(node => {
    if (node != startNode) distances[node] = Infinity;
    prev[node] = null;
  });

  while (!pq.isEmpty()) {
    let minNode = pq.dequeue();
    let currNode = minNode.data;
    adjList[currNode].forEach(neighbor => {
      let alt = distances[currNode] + neighbor.weight;
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
        prev[neighbor.node] = currNode;
        !pq.contain(neighbor.node)
          ? pq.enqueue(neighbor.node, distances[neighbor.node])
          : pq.update(neighbor.node, alt);
      }
    });
  }
  return distances;
};
