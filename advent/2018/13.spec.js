const assert = require('assert');
const app = require('./13.js');

describe('13 day', function() {
    const canvas = `/->-\       
|   |  /----\
| /-+--+-\  |
| | |  | v  |
\-+-/  \-+--/
  \------/`;
    

    describe('Carts', function() {
        it('should return the correct number of carts', function() {
            assert.deepEqual(app.getCarts(canvas), [{x: 2, y: 0, direction: '>'}, { x: 9, y: 2, direction: 'v' }]);
        });

        it('should indentify the cart', function() {
            assert.equal(app.isCart('>'), true);
            assert.equal(app.isCart('<'), true);
            assert.equal(app.isCart('^'), true);
            assert.equal(app.isCart('v'), true);
            assert.equal(app.isCart('|'), false);
            assert.equal(app.isCart('/'), false);
            assert.equal(app.isCart('+'), false);
        });

        it('should return a a path from on position', function() {
            assert.equal(app.getPath(canvas, 0, 0), '/');
            assert.equal(app.getPath(canvas, 1, 0), '-');
            assert.equal(app.getPath(canvas, 2, 4), '+');

        });

    });
    
});