import {splitLineToNum} from '../../lib/utils/array/split-line';
import {readFile} from '../../lib/files/read-file';

const data = splitLineToNum(readFile(`advent/2018/data/01-1`), '\n');

// ---------------------------------------------------------------------------------------------------------------------
// result 1
export const getFrequency = (inputArr, startWith = 0) => inputArr.reduce((acc, i) => acc + i, startWith) ;

console.log(`Result 1: ${getFrequency(data, 0)}`);

// ---------------------------------------------------------------------------------------------------------------------
// result 2
export const frequencyRepeat = (data, frequency = 0) => {
    let cache = new Map();
    let itt = 0;
    const mod = data.length;

    while (!cache.has(frequency)) {
        cache.set(frequency, 1);
        frequency += data[itt % mod];

        itt++;
    }

    return frequency;
};


console.log(`Result 2: ${frequencyRepeat(data, 0)}`);


