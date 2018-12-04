import {readFile} from '../../lib/files/read-file';
import {splitLine} from '../../lib/utils/array/split-line';

const data = splitLine(readFile(`advent/2018/data/03-1`), '\r\n');
const memory = [];
const claims = [];

const createClaim = (line) => {
    const parse = /(.*) @ ([\d]+),([\d]+): ([\d]+)x([\d]+)/;
    const [, id, x, y, w, h] = line.match(parse);

    return {id: id, x: +x, y: +y, w: +w, h: +h, positions: []}
};

const addToMemory = (memory, claim) => {
    for(let x = claim.x; x < claim.x + claim.w; x++) {
        for(let y = claim.y; y < claim.y + claim.h; y++) {
            const position = x + (y * 1000);

            memory[position] = memory[position] || [];
            memory[position].push(claim);

            claim.positions.push(position);
        }
    }
    return memory;
};

const hasCollission = (claim, memory) => {
    const n = claim.positions.reduce((acc, position) => memory[position].length === 1 && acc, true);

    return !n;
};

data.forEach((line) => {
    const claim = createClaim(line);
    claims.push(claim);
    addToMemory(memory, claim);
});

claims.forEach(claim => {
    const p = hasCollission(claim, memory);
    if (!p) console.log('=====', claim.id);
});
