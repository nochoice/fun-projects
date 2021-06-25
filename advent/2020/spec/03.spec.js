const { treesOnTrajectory } = require('../03');

const input = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;

describe('Day 3: Toboggan Trajectory ---', () => {
    it('should count number of trewes on the road', () =>{
        expect(treesOnTrajectory(input, [3, 1])).toBe(7)
    });

    it('should multiply all defined slopes', () => {
        const slope1 = treesOnTrajectory(input, [1, 1]);
        const slope2 = treesOnTrajectory(input, [3, 1]);
        const slope3 = treesOnTrajectory(input, [5, 1]);
        const slope4 = treesOnTrajectory(input, [7, 1]);
        const slope5 = treesOnTrajectory(input, [1, 2]);

        expect(slope1).toBe(2);
        expect(slope2).toBe(7);
        expect(slope3).toBe(3);
        expect(slope4).toBe(4);
        expect(slope5).toBe(2);

        expect(slope1 * slope2 * slope3 * slope4 * slope5).toBe(336)

    })
})