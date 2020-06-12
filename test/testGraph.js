const { assert } = require('chai');
const { bfs, dfs } = require('../src/graph');

describe('graphTraversal', function () {
  const testData = [
    ['nn', 'oo'],
    ['nn', 'nn'],
    ['mm', 'oo'],
    ['mm', 'll'],
    ['ll', 'jj'],
    ['jj', 'kk'],
    ['kk', 'ii'],
    ['kk', 'jj'],
    ['kk', 'mm'],
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

  context('dfs', function () {
    it('should return false if the source vertex has no outgoing edges', function () {
      assert.isFalse(dfs(testData, 'oo', 'mm'));
    });

    it('should detect a edge between adjacent vertices', function () {
      assert.isTrue(dfs(testData, 'mm', 'll'));
    });

    it('should report absence of an edge between two nodes', function () {
      assert.isFalse(dfs(testData, 'nn', 'mm'));
    });

    it('should detect the edge between two non-adjacent vertices', function () {
      assert.isTrue(dfs(testData, 'mm', 'jj'));
    });

    it('should be able to detect the edges when there is looping in the path', function () {
      assert.isTrue(dfs(testData, 'mm', 'ii'));
    });

    it('should detect an edge from a vertex to itself if exists', function () {
      assert.isTrue(dfs(testData, 'nn', 'nn'));
    });

    it('should report absence of an edge from a vertex to itself', function () {
      assert.isFalse(dfs(testData, 'ii', 'ii'));
    });
  });
});
