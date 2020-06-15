const recordConnections = function (connections, pair) {
  const [from, to] = pair;

  if (!connections[from]) {
    connections[from] = [];
  }

  connections[from].push(to);

  return connections;
};

const bfs = function (pairs, source, target) {
  const connections = pairs.reduce(recordConnections, {});
  const visited = [];
  const toVisit = [source];

  while (toVisit.length) {
    const vertexToProcess = toVisit.shift();
    const adjacentVertices = connections[vertexToProcess];

    if (!adjacentVertices) {
      continue;
    }

    if (adjacentVertices.includes(target)) {
      return true;
    }

    adjacentVertices.forEach((vertex) => {
      if (!visited.concat(toVisit).includes(vertex)) {
        toVisit.push(vertex);
      }
    });

    visited.push(vertexToProcess);
  }

  return false;
};

const dfs = function (connections, source, target, visited = []) {
  const adjacentVertices = connections[source];

  if (!adjacentVertices) {
    return false;
  }

  if (adjacentVertices.includes(target)) {
    return true;
  }

  visited.push(source);

  return adjacentVertices.some(
    (vertex) =>
      !visited.includes(vertex) && dfs(connections, vertex, target, visited)
  );
};

module.exports = { bfs, dfs, recordConnections };
