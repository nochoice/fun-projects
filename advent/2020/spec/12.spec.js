const { changeDirection, getDistance, move, getDistanceWithWayPoint } = require('../12');

const input = `F10
N3
F7
R90
F11`

describe('Day 12', () => {
    it('should return right direction', () =>{
        expect(changeDirection('E', 'R', 90)).toBe('S');
        expect(changeDirection('E', 'R', 180)).toBe('W');
        expect(changeDirection('E', 'L', 180)).toBe('W');
        expect(changeDirection('E', 'L', 360)).toBe('E');
    });

    it('should count Manhattan distance', () => {
        expect(getDistance(input)).toBe(25);
    });

    it('should make move to right position', () => {
        expect(move([0,0], 'E', 1)).toEqual([1, 0]);
        expect(move([0,0], 'E', 11)).toEqual([11, 0]);
        expect(move([0,0], 'W', 7)).toEqual([-7, 0]);
        expect(move([0,0], 'N', 7)).toEqual([0, -7]);
        expect(move([0,0], 'S', 7)).toEqual([0, 7]);
    });

    it('should count Manhattan distance with way point', () => {
        expect(getDistanceWithWayPoint(input)).toBe(286);
    });

    it('should move ship and waypoint', () => {
        expect(moveWithWayPoint([0, 0], [10, 1] ,'E', 10)).toEqual([[100, 10], [90, 9]]);
    });
    
})