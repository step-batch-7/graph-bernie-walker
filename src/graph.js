//Example
// Pairs => [[from,to],[to,from]]
// Source => from
// To => to
// Should return true.

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

module.exports = { bfs };
