import BinaryHeap from "./binaryHeap";

const minimum = (a, b) => {
  if (a < b) return a;
  else return b;
};

var adj;
const adj_Construct = (nodes, edges) => {
  adj = Array(nodes.length);
  for (var e of edges) {
    adj[e.from].push(e.to);
  }
};

// nodes: set of all Nodes in G
// edges: set of all edges in G
// s: Starting node
//outputs:
// X: stored the sequence of steps of using Dijkstra's algorithm, including node and its value
// dist[s.id][u.id]: minimum distance from s to u
const dijkstras = (nodes, edges, s) => {
  // X stores the order of nodes visited as well as their stored weight at that time to determing Dijkstra's Algorithm
  var X = [];

  var dist = Array(nodes.length);
  for (i of dist) {
    i = Array(nodes.length);
  }
  // create priority queue
  var priorityQueue = new BinaryHeap(
    function(element) {
      return element.value;
    },
    function(element) {
      return element.node.id;
    },
    "value"
  );

  priorityQueue.push({ node: s, value: 0 });
  dist[s.id][s.id] = 0;
  var i;
  var dist = new Array(2);
  for (var u of nodes) {
    if (u != s) {
      priorityQueue.push({ node: u, Infinity });
      dist[s.id][u.id] = Infinity;
    }
  }

  var i;
  var v;
  for (i = 1; i < nodes.length; i++) {
    v = priorityQueue.pop();
    for (var u of adj(v.node)) {
      //adj() also need to implemented in graph structure
      dist[s.id][u.id] = minimum(
        dist[s.id][u.id],
        // dist[s.id][v.id] + edges[v.id][u.id]
        dist[s.id][v.id] + 1
      ); // Need to add data structure for length - weight on edge connecting v to u.
      priorityQueue.decreaseKey(u, dist[s.id][u.id]);
    }
    X.push({ node: u, key: dist[s.id][u.id] });
  }
  return dist;
};

export default dijkstras;
