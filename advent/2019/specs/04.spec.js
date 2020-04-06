const assert = require('assert');
const app = require('../04');

describe('Secure Container', function() {
  it('should be a six-digit number', function() {
    assert.equal(app.isRightDigitLength(564874, 6), true);
    assert.equal(app.isRightDigitLength(5, 6), false);
  });

  it('should be have same adjacent numbers', function() {
    assert.equal(app.sameAdjNumbers(566874), true);
    assert.equal(app.sameAdjNumbers(54544), true);
    assert.equal(app.sameAdjNumbers(11111111), true);
    assert.equal(app.sameAdjNumbers(156989), false);
    assert.equal(app.sameAdjNumbers(5687), false);
  });

  it('should have increasing numbers', function() {
    assert.equal(app.isIncreasing(123456), true);
    assert.equal(app.isIncreasing(654321), false);
    assert.equal(app.isIncreasing(15689), true);
    assert.equal(app.isIncreasing(135679), true);
    assert.equal(app.isIncreasing(111123), true);
    assert.equal(app.isIncreasing(223450), false);
  });

  it.only('are not part of a larger group of matching digits', function() {
    assert.equal(app.hasNopartOfLargeAdj(123338), false);
    assert.equal(app.hasNopartOfLargeAdj(333389), false);
    assert.equal(app.hasNopartOfLargeAdj(333889), true);
    assert.equal(app.hasNopartOfLargeAdj(133344), true);
    assert.equal(app.hasNopartOfLargeAdj(112233), true);
    assert.equal(app.hasNopartOfLargeAdj(122233), true);
    assert.equal(app.hasNopartOfLargeAdj(122444), false);
    assert.equal(app.hasNopartOfLargeAdj(122244), true);
    assert.equal(app.hasNopartOfLargeAdj(111122), true);
    assert.equal(app.hasNopartOfLargeAdj(333122), false);
    // assert.equal(app.hasNopartOfLargeAdj(11111111), true);
  });
});

