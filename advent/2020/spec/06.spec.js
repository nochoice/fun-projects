const { getGroups, groupYes, result1, result2, countSameInGroup } = require('../06')

const input = `abc

a
b
c

ab
ac

a
a
a
a

b`
describe('Day 6 - ', () => {
    it('should return groups', () => {
        expect(getGroups(input)).toEqual([['abc'], ['a', 'b', 'c'], ['ab', 'ac'], ['a','a','a','a'], ['b']]);
    });

    it('should count yes answers in group', () => {
        expect(groupYes(['abc'])).toEqual({a: 1, b: 1, c: 1});
        expect(groupYes(['a', 'a', 'a'])).toEqual({a: 3});
        expect(groupYes(['a', 'b', 'a'])).toEqual({a: 2, b: 1});
    })

    it('should count all yes answers in group', () => {
        expect(result1(input)).toBe(11);
    })

    it('should count all yes answers in group that the users check', () => {
        expect(result2(input)).toBe(6);
    })

    it('should count same answers in group', () => {
        expect(countSameInGroup(['abc'])).toBe(3);
        expect(countSameInGroup( ['b'])).toBe(1);
        expect(countSameInGroup(['a', 'b', 'a'])).toBe(0);
        expect(countSameInGroup(['ab', 'ac'])).toBe(1);
        expect(countSameInGroup( ['a','a','a','a'])).toBe(1);
    })
})