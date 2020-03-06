const assert = require('assert');
const app = require('../03');

describe('Crossed wires', function() {

  it('Manhattan distance', function() {
    assert.deepEqual(app.manhattanDistance({}, [0,0], ['U7,R6,D4,L4','R8,U5,L5,D3']), 6);
    assert.deepEqual(app.manhattanDistance({}, [0,0], ['R75,D30,R83,U83,L12,D49,R71,U7,L72','U62,R66,U55,R34,D71,R55,D58,R83']), 159);
    assert.deepEqual(app.manhattanDistance({}, [0,0], ['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51','U98,R91,D20,R16,D67,R40,U7,R15,U6,R7']), 135);
  });
  
  it('Add single direction to grid', function() {
    assert.deepEqual(app.addSingleDirection({}, 0, [0,0], 'L1'), {'1|0': {paths: [0]}});
    assert.deepEqual(app.addSingleDirection({}, 0, [0,0], 'T1'), {'0|1': {paths: [0]}});
    assert.deepEqual(app.addSingleDirection({}, 0, [0,0], 'D1'), {'0|-1': {paths: [0]}});
    assert.deepEqual(app.addSingleDirection({}, 0, [0,0], 'R1'), {'-1|0': {paths: [0]}});
    // assert.deepEqual(app.addSingleDirection({}, 0, [0,0], 'L2'), {'1|0': {paths: [0]}, '2|0': {paths: [0]}});
  });

  it('Add path to grid', function() {
    assert.deepEqual(app.addDirection({}, 0, [0,0], 'L1,L1'), {'1|0': {paths: [0]}, '2|0': {paths: [0]}});
    assert.deepEqual(app.addDirection({}, 0, [0,0], 'L1,L1,L1'), {'1|0': {paths: [0]}, '2|0': {paths: [0]}, '3|0': {paths: [0]}});
    assert.deepEqual(app.addDirection({}, 0, [0,0], 'L1,L1,D1'), {'1|0': {paths: [0]}, '2|0': {paths: [0]}, '2|-1': {paths: [0]}});
    assert.deepEqual(app.addDirection({}, 0, [0,0], 'L1,L1,U1'), {'1|0': {paths: [0]}, '2|0': {paths: [0]}, '2|1': {paths: [0]}});
    assert.deepEqual(app.addDirection({}, 0, [0,0], 'L1,L1,U1,R1'), {'1|0': {paths: [0]}, '2|0': {paths: [0]}, '2|1': {paths: [0]}, '1|1': {paths: [0]}});
  });

  it('Parse path', function() {
    assert.deepEqual(app.parsePath('L1'), {direction: 'L', len: 1});
    assert.deepEqual(app.parsePath('L2'), {direction: 'L', len: 2});
    assert.deepEqual(app.parsePath('L20'), {direction: 'L', len: 20});
  });

  it('Get next start position', function() {
    assert.deepEqual(app.getNextPostion([0, 0], 'L1'), [1,0]);
    assert.deepEqual(app.getNextPostion([0, 0], 'L2'), [2,0]);
    assert.deepEqual(app.getNextPostion([0, 0], 'R2'), [-2,0]);
  });
});
