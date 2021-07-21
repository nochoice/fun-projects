const { parseBlocks, validationsParse, numberIsValid, nearbyParse, ticketScanningErrorRate } = require('../16');

const input = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

describe('Day 16', () => {
    it('should  parse blocks', () =>{
        expect(parseBlocks(input)).toEqual(
            [
                `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50`,

                `your ticket:
7,1,14`,

                `nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`

            ]
        );
    });

    it('should create a validation map', () => {
        const val = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50`;

        expect(validationsParse(val)).toEqual({
            'class': [ {from: 1, to: 3}, {from: 5, to: 7}],
            'row': [ {from: 6, to: 11}, {from: 33, to: 44} ],
            'seat': [ {from: 13, to: 40}, {from: 45, to: 50} ]
        })
    });

    it('should is number valid', () => {

        const validations = {
            'class': [ {from: 1, to: 3}, {from: 5, to: 7}],
            'row': [ {from: 6, to: 11}, {from: 33, to: 44} ],
            'seat': [ {from: 13, to: 40}, {from: 45, to: 50} ]
        }

        expect(numberIsValid(validations, 7)).toBeTruthy();
        expect(numberIsValid(validations, 50)).toBeTruthy();
        expect(numberIsValid(validations, 4)).toBeFalsy();
        expect(numberIsValid(validations, 12)).toBeFalsy();
    });

    it('should parse nearby', () => {

        const val = `nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`

        expect(nearbyParse(val)).toEqual([
            [7,3,47],
            [40,4,50],
            [55,2,20],
            [38,6,12]
        ]);
    });

    it('should cont error rate', () => {
        expect(ticketScanningErrorRate(input)).toBe(71)
    })
});
