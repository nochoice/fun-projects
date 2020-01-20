const assert = require('assert');
const app = require('../21-amicable-numbers');

describe('Amicable numbers', function() {
  it.only('it should return list of dividers', function() {
    assert.deepEqual(app.dividers(6), [1,2,3]);
    assert.deepEqual(app.dividers(5), [1]);
    assert.deepEqual(app.dividers(12), [1,2,3,4,6]);
    assert.deepEqual(app.dividers(12, true), [1,2,3,4,6,12]);
  })

  it.only('it should return sumarize the items in array', function() {
    assert.deepEqual(app.sumOfDividers([1,2,3]), 6);
    assert.deepEqual(app.sumOfDividers([1,2,3,6]), 12);
    assert.deepEqual(app.sumOfDividers([1,2,3,5]), 11);
  })
});