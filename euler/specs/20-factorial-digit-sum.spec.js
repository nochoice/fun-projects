const assert = require('assert');
const app = require('../20-factorial-digit-sum');

describe('Factorial digit sum', function() {

  it('it should count factorial', function() {
    assert.equal(app.factorial('3'), '6');
    assert.equal(app.factorial('4'), '24');
    assert.equal(app.factorial('10'), '3628800');
  })

  it('it should count sum of factorial', function() {
    assert.equal(app.sumOfNumbers('10'), '27');
  })
  

});