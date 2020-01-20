const assert = require('assert');
const app = require('../16-power-digit-sum');

describe('Multiplication of strings', function() {

  it('it should multiplacte simple', function() {
    assert.equal(app.powerTwos('2', '1'), '2');
    assert.equal(app.powerTwos('2', '3'), '8');
    assert.equal(app.powerTwos('2', '10'), '1024');
    assert.equal(app.powerTwos('2', '11'), '2048');
  })

  it('it should return sum of numbers', function() {
    assert.equal(app.sumOfNumbers('2', '15'), '26');
    // assert.equal(app.sumOfNumbers('2', '1000'), '26');
  })
});

