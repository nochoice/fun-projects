const assert = require('assert');
const app = require('../22-names-scores');

describe('Names scores', function() {
  it('it should return parse string and return sorted array', function() {
    assert.deepEqual(app.sortNames('"MARY"'), ["MARY"]);
    assert.deepEqual(app.sortNames('"CC","AAA"'), ["AAA", "CC"]);
    assert.deepEqual(app.sortNames('"MARY","PATRICIA","LINDA","BARBARA","ELIZABETH","JENNIFER"'), ["BARBARA", "ELIZABETH", "JENNIFER", "LINDA", "MARY", "PATRICIA"]);
  })

  it.only('it should count the alphanumeerical position of each letter', function() {
    assert.deepEqual(app.countLettersPosition('A'), 1);
    assert.deepEqual(app.countLettersPosition('COLIN'), 53);
    // assert.deepEqual(app.countLettersPosition([1,2,3,6]), 12);
    // assert.deepEqual(app.countLettersPosition([1,2,3,5]), 11);
  })
});