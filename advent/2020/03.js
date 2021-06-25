const fs = require('fs');

const data = fs.readFileSync('./2020/data/03.txt', {encoding:'utf8', flag:'r'});

const treesOnTrajectory = (input, slope) => {
    const data = input.split(/\r?\n/);
    const lineLegth = data[0].length;

    const p = data
            .filter((_, i) => i % slope[1] === 0)
            .map((line, i) => line[(i * slope[0]) % lineLegth])
            .filter(i => i === '#')
            .length;

    return p;
}

const slope1 = treesOnTrajectory(data, [1, 1]);
const slope2 = treesOnTrajectory(data, [3, 1]);
const slope3 = treesOnTrajectory(data, [5, 1]);
const slope4 = treesOnTrajectory(data, [7, 1]);
const slope5 = treesOnTrajectory(data, [1, 2]);

// console.log('Day 3-1: ', treesOnTrajectory(data, [3, 1]))
// console.log('Day 3-2: ', slope1 * slope2 * slope3 * slope4 * slope5)

module.exports = {
    treesOnTrajectory
}