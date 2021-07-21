const { mostRecentlySpoken } = require('../15');

const input = `0,3,6`;

describe('Day 15', () => {
    it('should get most recent', () =>{
        expect(mostRecentlySpoken(input, 4)).toBe(0);
        expect(mostRecentlySpoken(input, 5)).toBe(3);
        expect(mostRecentlySpoken(input, 6)).toBe(3);
        expect(mostRecentlySpoken(input, 7)).toBe(1);
        expect(mostRecentlySpoken(input, 8)).toBe(0);
        expect(mostRecentlySpoken(input, 9)).toBe(4);
        expect(mostRecentlySpoken(input, 10)).toBe(0);
        expect(mostRecentlySpoken(input, 2020)).toBe(436);
    });

    it('should get most recent other inputs', () =>{
        expect(mostRecentlySpoken('1,3,2', 2020)).toBe(1);
        expect(mostRecentlySpoken('2,1,3', 2020)).toBe(10);
        expect(mostRecentlySpoken('3,1,2', 2020)).toBe(1836);
        // expect(mostRecentlySpoken('0,3,6', 30000000)).toBe(175594);

        // Given 0,3,6, the th number spoken is 175594.
    });

})