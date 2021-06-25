const {numOfNotValidPass, checkPass, checkPassCorporate, numOfValidPassCorporate} = require('../02');

const data = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;

describe('Day 2: Password Philosophy', () => {
    it('should return num of invalid passwords', () => {
        expect(numOfNotValidPass(data)).toBe(2);
    });

    it('should check password', () => {
        expect(checkPass('abcde', 'a', 1, 3)).toBe(true);
        expect(checkPass('cdefg', 'b', 1, 3)).toBe(false);
        expect(checkPass('ccccccccc', 'c', 2, 9)).toBe(true);
    });

    it('should check password for corporate', () => {
        expect(checkPassCorporate('abcde', 'a', 1, 3)).toBe(true);
        expect(checkPassCorporate('cdefg', 'b', 1, 3)).toBe(false);
        expect(checkPassCorporate('ccccccccc', 'c', 2, 9)).toBe(false);
    });

    
})