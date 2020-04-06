const assert = require('assert');
const app = require('../06');

describe('Universal Orbit Map', function() {
  it('should parse data', function() {
    assert.deepEqual(app.parseData(`COM)B
        B)C
        C)D`), [{start: 'COM', end: 'B'}, {start: 'B', end: 'C'}, {start: 'C', end: 'D'}]);
  });
  it('should build tree', function() {
    assert.deepEqual(app.generateTree(`COM)B
        B)C
        B)D
        D)E`, 'COM'), 
        {
          name: 'COM',
          children: [
            {
              name: 'B',
              children: [
                {
                  name: 'C',
                  children: []
                },
                {
                  name: 'D',
                  children: [
                    {
                      name: 'E',
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        });
  });

  it.only('should count sum of direct and indirect orbits', function() {
    assert.equal(app.countSumDirectIndirect(`COM)B
    B)C
    C)D
    D)E
    E)F
    B)G
    G)H
    D)I
    E)J
    J)K
    K)L`), 42);
  });


  

 
});

