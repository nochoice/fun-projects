const { seatId } = require('../05')

describe('Day 5 - ', () => {
    it('should cont the right seat ID', () => {
        expect(seatId('BFFFBBFRRR')).toBe(567);
        expect(seatId('FFFBBBFRRR')).toBe(119);
        expect(seatId('BBFFBBFRLL')).toBe(820);
        expect(seatId('BBFFBBFRLL')).toBe(820);
    })
})