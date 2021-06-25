const fs = require('fs');

const data = fs.readFileSync('./2020/data/11.txt', {encoding:'utf8', flag:'r'});

const result = (input) => {
    let matrix = parseInput(input);
    const ly = matrix.length;
    const lx = matrix[0].length;

    let matrixNext;

    let changed = true;
    let itt = 0;

    while (changed) {
        matrixNext = [];

        for(let y=0; y<ly; y++) {
            matrixNext.push([]);

            for(let x=0; x<lx; x++) {
                const newPosChar = changeByCondtions(matrix, y, x);

                matrixNext[y][x] = newPosChar;
            }
        }

        const matrixNextStr = JSON.stringify(matrixNext);
        const matrixStr = JSON.stringify(matrix);

        matrix = JSON.parse(matrixNextStr);
        

        if (matrixNextStr === matrixStr) { changed = false}
        itt++;
    }


    const result = matrixNext.flat().filter(i => i === '#').length;
    return result;

}

const toText = (matrix) => {
    return matrix.map((item) => item.join('')).join('\n')
}

const changeByCondtions = (matrix, y, x) => {
    const position = matrix[y][x];

    if (position === '.') return position;

    const adj = getFirstToSee(matrix, y, x);

    if (position === 'L') {
        return !adj.includes('#') ? '#' : 'L';
    }

    if (position === '#') {
        return (adj.filter(i => i === '#').length >= 5) ? 'L' : '#';
    }
}

const parseInput = (input) => input.split(/\r?\n/).map(line => line.split(''))

const getAdjacents = (matrix, y, x) => {
    const out = [];

    for(let i = x-1; i<=x+1; i++) {
        for(let j = y-1; j<=y+1; j++) {
            if (i === x && j === y) { continue; }
            if (matrix[i] && matrix[i][j]) { out.push(matrix[j][i]); } 
            else { out.push(null); }
        }
    }

    // console.log(out)
    return out
} 

const getFirstToSee = (matrix, y, x) => {
    const directions = [[-1,-1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];

    const firstSee = [];
    for(let d = 0; d < directions.length; d++) {
        const direction = directions[d];
        let diffX = x;
        let diffY = y;
        let saw = false;
        let isInMatrix;

        do {
            diffX += direction[0];
            diffY += direction[1];
            isInMatrix = matrix[diffY] && matrix[diffY][diffX];

            if (!isInMatrix) {break;}
            let position = matrix[diffY][diffX];
            if (position === 'L' || position === '#') {
                saw = true;
                firstSee.push(position);
            }

        } while (!saw)
    }
    
    return firstSee;
}

// console.log(result(data));


module.exports = {
    result,
    parseInput,
    getAdjacents,
    getFirstToSee
}