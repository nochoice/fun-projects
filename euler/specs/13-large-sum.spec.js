const assert = require('assert');
const app = require('../13-large-sum.js');

describe('Sum of strings', function() {

  it('it should count simple', function() {
    assert.equal(app.sum('5', '1'), '6');
    assert.equal(app.sum('1', '5'), '6');
    assert.equal(app.sum('9', '3'), '12');
    assert.equal(app.sum('9', '9'), '18');
    assert.equal(app.sum('10', '2'), '12');
    assert.equal(app.sum('2', '10'), '12');
    assert.equal(app.sum('7', '19'), '26');
  })

  it('it should count over 10', function() {
    assert.equal(app.sum('7', '19'), '26');
    assert.equal(app.sum('19', '7'), '26');
    assert.equal(app.sum('99', '2'), '101');
    assert.equal(app.sum('2', '99'), '101');
    assert.equal(app.sum('123', '321'), '444');
  })

  it('it should count huge number', function() {
    assert.equal(app.sum('100000000000', '100000000000'), '200000000000');
    assert.equal(app.sum('100000000001', '100000000000'), '200000000001');
    assert.equal(app.sum('100500000001', '100050000000'), '200550000001');
  })

  it('it should count more arguments than 2', function() {
    assert.equal(app.sum('7', '19', '1'), '27');
    assert.equal(app.sum('7', '19', '4'), '30');
    assert.equal(app.sum('7', '20', '4'), '31');
    assert.equal(app.sum('9', '9', '9', '9'), '36');
    assert.equal(app.sum('99', '99', '99', '99'), '396');
  })

  it('it should count an array', function() {
    assert.equal(app.sum(['7', '19', '1']), '27');
    assert.equal(app.sum(['99', '99', '99', '99']), '396');
  })
});

