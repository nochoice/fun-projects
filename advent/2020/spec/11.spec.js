const { result, parseInput, getAdjacents, getFirstToSee } = require('../11');

const input = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

const input2 = `LL.
.LL
L.L`


describe('Day 11', () => {
    it('should count occupied seats', () =>{
        expect(result(input)).toBe(26);

    });

    it('should prepare matrix', () => {
        expect(parseInput(input2)).toEqual([['L', 'L', '.'], ['.', 'L', 'L'], ['L', '.', 'L']])
    })

    it('should return adjancets', () => {
        const m = parseInput(input2);
        expect(getAdjacents(m, 0, 0)).toEqual([null, null, null, null, '.', null, 'L', 'L'])
        expect(getAdjacents(m, 1, 1)).toEqual(['L', '.', 'L', 'L', '.', '.', 'L', 'L'])
    });

    it('should return first seeing', () => {
        const matrix1 = parseInput(`.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....`);

        const matrix2 = parseInput(`.............
.L.L.#.#.#.#.
.............`)
        
        expect(getFirstToSee(matrix1, 4, 3)).toEqual([ '#', '#', '#', '#', '#', '#', '#', '#' ]);
        expect(getFirstToSee(matrix2, 1, 1)).toEqual([ 'L' ]);
    })
})