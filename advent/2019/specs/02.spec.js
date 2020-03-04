const assert = require('assert');
const app = require('../02');

describe('Intcode program', function() {
  it('It should apply one step to code', function() {
    assert.equal(app.apply('1,9,10,3,2,3,11,0,99,30,40,50', 0), '1,9,10,70,2,3,11,0,99,30,40,50');
    assert.equal(app.apply('1,9,10,70,2,3,11,0,99,30,40,50', 4), '3500,9,10,70,2,3,11,0,99,30,40,50');
  });

  it.only('It should run', function() {
    assert.equal(app.run('1,0,0,0,99', 0), '2,0,0,0,99');
    assert.equal(app.run('2,3,0,3,99', 0), '2,3,0,6,99');
    assert.equal(app.run('2,4,4,5,99,0', 0), '2,4,4,5,99,9801');
    assert.equal(app.run('1,1,1,4,99,5,6,0,99', 0), '30,1,1,4,2,5,6,0,99');
  });
});
