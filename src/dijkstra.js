export function dijkstra(graph, start) {
    const numNodes = graph.length;
    const distances = new Array(numNodes).fill(Infinity);
    const visited = new Array(numNodes).fill(false);
    const path = new Array(numNodes).fill(null);
  
    distances[start] = 0;
  
    for (let iteration = 0; iteration < numNodes - 1; iteration++) {
      const minDistanceNode = findMinDistanceNode(distances, visited);
      visited[minDistanceNode] = true;
  
      for (let j = 0; j < numNodes; j++) {
        if (!visited[j] && graph[minDistanceNode][j] !== 0 && distances[minDistanceNode] !== Infinity &&
            distances[minDistanceNode] + graph[minDistanceNode][j] < distances[j]) {
          distances[j] = distances[minDistanceNode] + graph[minDistanceNode][j];
          path[j] = minDistanceNode;
        }
      }
    }
  
    return { distances, path };
  }
  
  function findMinDistanceNode(distances, visited) {
    let minDistance = Infinity;
    let minDistanceNode = -1;
  
    for (let i = 0; i < distances.length; i++) {
      if (!visited[i] && distances[i] < minDistance) {
        minDistance = distances[i];
        minDistanceNode = i;
      }
    }
  
    return minDistanceNode;
  }
