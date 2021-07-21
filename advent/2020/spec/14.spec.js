const { countSumInMemory, transform } = require('../14');

const input = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

describe('Day 14', () => {
    it('should parse', () =>{
        expect(countSumInMemory(input)).toBe(165);
    });

    it('should use mask on a number', () => {
        expect(transform('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X', 11)).toBe(73);
        expect(transform('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X', 101)).toBe(101);
        expect(transform('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X', 0)).toBe(64);
    })
})