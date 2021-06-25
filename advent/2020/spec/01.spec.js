const {repair, repairAny} = require('../01');
const input = `1721
979
366
299
675
1456`;

describe('Day 1', () => {
    it('should find sum of two items to be 2020 and multiply them', ()=> {
        expect(repair(input, 2020)).toBe(514579)
    }),

    it('should find sum of three items to be 2020 and multiply them', ()=> {
        expect(repairAny(input, 2020)).toBe(241861950)
    })
    
})