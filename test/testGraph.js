const { assert } = require('chai');
const { bfs, dfs, findPath, recordConnections } = require('../src/graph');

describe('graphTraversal', function () {
  const testData = [
    ['nn', 'oo'],
    ['nn', 'nn'],
    ['mm', 'oo'],
    ['mm', 'll'],
    ['ll', 'jj'],
    ['jj', 'kk'],
    ['kk', 'jj'],
    ['kk', 'mm'],
    ['kk', 'ii'],
  ];

  context('bfs', function () {
    it('should return false if the source vertex has no outgoing edges', function () {
      assert.isFalse(bfs(testData, 'oo', 'mm'));
    });

    it('should detect a edge between adjacent vertices', function () {
      assert.isTrue(bfs(testData, 'mm', 'll'));
    });

    it('should report absence of an edge between two nodes', function () {
      assert.isFalse(bfs(testData, 'nn', 'mm'));
    });

    it('should detect the edge between two non-adjacent vertices', function () {
      assert.isTrue(bfs(testData, 'mm', 'jj'));
    });

    it('should be able to detect the edges when there is looping in the path', function () {
      assert.isTrue(bfs(testData, 'mm', 'ii'));
    });

    it('should detect an edge from a vertex to itself if exists', function () {
      assert.isTrue(bfs(testData, 'nn', 'nn'));
    });

    it('should report absence of an edge from a vertex to itself', function () {
      assert.isFalse(bfs(testData, 'ii', 'ii'));
    });
  });

  const adjacencyList = testData.reduce(recordConnections);

  context('dfs', function () {
    it('should return false if the source vertex has no outgoing edges', function () {
      assert.isFalse(dfs(adjacencyList, 'oo', 'mm'));
    });

    it('should detect a edge between adjacent vertices', function () {
      assert.isTrue(dfs(adjacencyList, 'mm', 'll'));
    });

    it('should report absence of an edge between two nodes', function () {
      assert.isFalse(dfs(adjacencyList, 'nn', 'mm'));
    });

    it('should detect the edge between two non-adjacent vertices', function () {
      assert.isTrue(dfs(adjacencyList, 'mm', 'jj'));
    });

    it('should be able to detect the edges when there is looping in the path', function () {
      assert.isTrue(dfs(adjacencyList, 'mm', 'ii'));
    });

    it('should detect an edge from a vertex to itself if exists', function () {
      assert.isTrue(dfs(adjacencyList, 'nn', 'nn'));
    });

    it('should report absence of an edge from a vertex to itself', function () {
      assert.isFalse(dfs(adjacencyList, 'ii', 'ii'));
    });
  });

  context('findPath', function () {
    it('should not find the path when source has no outgoing edges', function () {
      assert.deepStrictEqual(findPath(adjacencyList, 'oo', 'mm'), []);
    });

    it('should find a path between adjacent vertices', function () {
      assert.deepStrictEqual(findPath(adjacencyList, 'mm', 'll'), ['mm', 'll']);
    });

    it('should should not find a path if does not exist', function () {
      assert.deepStrictEqual(findPath(adjacencyList, 'nn', 'mm'), []);
    });

    it('should find the path between two non-adjacent vertices', function () {
      const expected = ['mm', 'll', 'jj'];
      assert.deepStrictEqual(findPath(adjacencyList, 'mm', 'jj'), expected);
    });

    it('should be able find path when there are looped connections', function () {
      const expected = ['mm', 'll', 'jj', 'kk', 'ii'];
      assert.deepStrictEqual(findPath(adjacencyList, 'mm', 'ii'), expected);
    });

    it('should find a path from a vertex to itself if exists', function () {
      assert.deepStrictEqual(findPath(adjacencyList, 'nn', 'nn'), ['nn', 'nn']);
    });

    it('should not find a path from a vertex to itself if does not exist', function () {
      assert.deepStrictEqual(findPath(adjacencyList, 'ii', 'ii'), []);
    });
  });
});
