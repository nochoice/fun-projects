const { getBestBus, chineese } = require('../13');

const input = `939
7,13,x,x,59,x,31,19`

describe('Day 13', () => {
    it('should ID of bus multiplied by waiting time ', () =>{
        expect(getBestBus(input)).toBe(295);
    });

    it('should retrieve the first time that is ok ', () =>{
        expect(chineese(input)).toBe(1068781);
    });



})