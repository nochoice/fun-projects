const fs = require('fs');

const data = fs.readFileSync('./2020/data/09.txt', {encoding:'utf8', flag:'r'});

const findFirst = (input, preamble) => {
    const data = parseInput(input);
    let out;

    for(let i=preamble; i<data.length; i++) {
        out = data[i];
        const p = getPreamble(data, preamble, i);
        const ch = isSumOfPreamble(out, p);

        if(!ch) {
            break;
        }
    }
    return out;
}

const isSumOfPreamble = (num, preamble) => {
    const p = Object.keys(preamble).map((item) => preamble[num - item] === null);

    return p.includes(true);

}

const parseInput = (input) => input.split(/\r?\n/).map(i => +i);
const getPreamble = (data, preamble, from) => {
    out = {};
    for(let i = from - preamble; i < from; i++) {
        out[data[i]] = null;
    }

    return out;
}

const findSum = (input, num) => {
    const data = parseInput(input);
    let sumOfIteration;
    let rowOk;
    let row;

    for(let i=0; i<data.length; i++) {
        sumOfIteration = data[i];
        row = [data[i]];
        for(let j=i+1; j<data.length; j++) {
            sumOfIteration += data[j];
            row.push(data[j]);
            if(sumOfIteration === num) {
                rowOk = row;
                break;
            }

            if(sumOfIteration > num) {
                break;
            }
        }

        if(rowOk) {
            break;
        }
    }


    return Math.max(...rowOk) + Math.min(...rowOk); 
}

// console.log(findFirst(data, 25))
// console.log(findSum(data, 14360655));

module.exports = {
    findFirst,
    findSum,
    getPreamble,
    parseInput,
    isSumOfPreamble
}