const assert = require('assert');
const app = require('../24-lexicographic-permutation');

describe('Lexicographic permutations', function() {
  it('it should return next permutation in order', function() {
    assert.deepEqual(app.permutationNext([0,1,2,3]), [0,1,3,2]);
    assert.deepEqual(app.permutationNext([0,1,2,3,4]), [0,1,2,4,3]);
    assert.deepEqual(app.permutationNext([5,1,7,6,3,9,8,4,2]), [5,1,7,6,4,2,3,8,9]);

    
  })

  it('it should check if permutation is biggest', function() {
    assert.equal(app.isHigerPermutation([2]), true);
    assert.equal(app.isHigerPermutation([2,1,0]), true);
    assert.equal(app.isHigerPermutation([1,2,0]), false);
    assert.equal(app.isHigerPermutation([3,2,1,0]), true);
    assert.equal(app.isHigerPermutation([5,3,1,0]), true);
    assert.equal(app.isHigerPermutation([2,3,1,0]), false);
  });
});

