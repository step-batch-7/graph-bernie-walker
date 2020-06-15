const detectPaths = function (paths, pair) {
  const [from, to] = pair;

  if (!paths[from]) {
    paths[from] = [];
  }

  paths[from].push(to);

  return paths;
};

const bfs = function (pairs, source, target) {
  const paths = pairs.reduce(detectPaths, {});
  const visited = [];
  const toVisit = [source];

  while (toVisit.length) {
    const vertexToProcess = toVisit.shift();
    const adjacentVertices = paths[vertexToProcess];

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

const dfs = function (paths, source, target, visited = []) {
  const adjacentVertices = paths[source];

  if (!adjacentVertices) {
    return false;
  }

  if (adjacentVertices.includes(target)) {
    return true;
  }

  visited.push(source);

  return adjacentVertices.some(
    (vertex) => !visited.includes(vertex) && dfs(paths, vertex, target, visited)
  );
};

module.exports = { bfs, dfs, detectPaths };
