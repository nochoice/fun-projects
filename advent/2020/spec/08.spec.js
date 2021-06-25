const { findLoop, replaced } = require('../08');

const input = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

const input2 = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
nop -4
acc +6 `

describe('Day 8', () => {
    it('should find loop and return accumulator', () => {
        expect(findLoop(input)).toEqual({ acc: 5, isEnd: false });
    })

    it('should replace one instuction and return accumulator', () => {
        expect(findLoop(input2)).toEqual({ acc: 8, isEnd: true });
    })

    it('should replace one instuction and return accumulator', () => {
        expect(replaced(input)).toEqual({ acc: 8, isEnd: true });
    })
})