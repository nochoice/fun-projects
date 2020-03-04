const assert = require('assert');
const app = require('../01');

describe('Fuel requirements', function() {
  it('It should calculate fuel requirements', function() {
    assert.equal(app.fuelRequirements(12), 2);
    assert.equal(app.fuelRequirements(14), 2);
    assert.equal(app.fuelRequirements(1969), 654);
    assert.equal(app.fuelRequirements(100756), 33583);
  })

  it.only('It should calculate fuel requirements with fuel', function() {
    assert.equal(app.fuelRequirementsWithFuel(1969), 966);
    assert.equal(app.fuelRequirementsWithFuel(100756), 50346);
  })

});

