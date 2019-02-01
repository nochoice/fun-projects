const assert = require('assert');
const app = require('./12.js');

describe('Get part of the string', function() {
 
  const str = '#..#.#..##......###...###';

  it('it should return a part of size 5 from center 4', function() {
    assert.equal(app.getPart(str, 4, 5), '.#.#.');
  });

  it('it should return a part of size 5 from center 5', function() {
    assert.equal(app.getPart(str, 5, 5), '#.#..');
  });

  it('it should return a part of size 5 from center 10', function() {
    assert.equal(app.getPart(str, 10, 5), '##...');
  });

  it('it should return a part of size 7 from center 10', function() {
    assert.equal(app.getPart(str, 10, 7), '.##....');
  });
});
