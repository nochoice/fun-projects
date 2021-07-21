const { reverse } = require('dns');
const fs = require('fs');

const data = fs.readFileSync('./2020/data/14.txt', {encoding:'utf8', flag:'r'});
const regexMask = /mask = (.*)/;
const regexMem = /mem\[(\d*)\] = (\d*)/;
const maskBlank = 'X';


const countSumInMemory = (input) => {
    const data = parse(input);

    const o = Object
            .keys(data)
            .map(k => data[k])
            .map(i => transform(i.mask, i.value))
            .reduce((acc, i ) => acc + i, 0)


    return o;
}

const transform = (mask, number) => {
    const numS = number.toString(2).split('').reverse();

    const o = mask
            .split('')
            .reverse()
            .map((item, i) => {
                if (numS[i] && item !== maskBlank)  { return item }
                if (numS[i] && item === maskBlank)  { return numS[i] }
                if (!numS[i] && item !== maskBlank)  { return item }

                return 0;
            })
            .reverse()
            .join('');

    return parseInt(o, 2);
}

const parse = (input) => {
    let mask = '';
    return input
                    .split(/\r?\n/)
                    .reduce((acc, line) => {
                        const isMask = regexMask.test(line);
                        const isMem = regexMem.test(line);

                        if(isMask) {
                            mask = line.match(regexMask)[1];
                            return acc;
                        }

                        if(isMem) {
                            const memP = line.match(regexMem);

                            acc[memP[1]] = {
                                mask,
                                value: +memP[2]
                            }
                        }

                        return acc;
                    }, {});
}


// console.log('---', countSumInMemory(data))

module.exports = {
    countSumInMemory,
    transform
}

