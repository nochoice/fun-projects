const { findFirst, parseInput, getPreamble, isSumOfPreamble, findSum } = require('../09');

const input = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

describe('Day 9', () => {
    it('should find first number that does not have this property', () => {
        expect(findFirst(input, 5)).toBe(127);
    });

    it('should retunrn right preamble', () => {
        const data = parseInput(input);

        expect(getPreamble(data, 5, 5)).toEqual({ 15: null, 20: null, 25: null, 35: null, 47: null })
        expect(getPreamble(data, 5, 6)).toEqual({ 15: null, 20: null, 25: null, 40: null, 47: null })
        expect(getPreamble(data, 3, 8)).toEqual({ 40: null, 55: null, 62: null })
    }),

    it('should chech if preamble has a sum of tupples', () => {
        expect(isSumOfPreamble(55, { '15': null, '25': null, '40': null, '47': null, '62': null })).toBeTruthy();
        expect(isSumOfPreamble(182, { '65': null, '95': null, '102': null, '117': null, '150': null })).toBeTruthy();
        expect(isSumOfPreamble(127, { '95': null, '102': null, '117': null, '150': null, '182': null })).toBeFalsy();
    });

    it('should sum of biggest ans smallest in row of sum', () => {
        expect(findSum(input, 127)).toBe(62);
    });
})