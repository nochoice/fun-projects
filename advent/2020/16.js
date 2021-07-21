const fs = require('fs');

const data = fs.readFileSync('./2020/data/16.txt', {encoding:'utf8', flag:'r'});

const ticketScanningErrorRate = (input) => {
    const blocks = parseBlocks(input);
    // console.log('--------', blocks[0]);
    const validations = validationsParse(blocks[0]);
    const nearbies = nearbyParse(blocks[2]);

    // console.log(nearbies);
    
    return nearbies
            .flatMap(x => x)
            .filter(num => !numberIsValid(validations, num))
            .reduce((acc, i) => acc + i, 0);
}

const ticketWithRightFields = (input) => {
    const blocks = parseBlocks(input);
    const validations = validationsParse(blocks[0]);
    const myTicket = parseMyTicket(blocks[1]);
    const nearbies = nearbyParse(blocks[2]);



    // console.log(nearbies);
    
    return nearbies
            .map(x => x)
            .filter(num => numberIsValid(validations, num))
            // .reduce((acc, i) => acc + i, 0);
}

const parseMyTicket = input => {
    return input.split('\n')[1].split(',').map(i => +i);
}
const validationsParse = (input) => {
    const data = input.split(/\r?\n/);
    const reg = /(.*): (\d*)-(\d*) or (\d*)-(\d*)/;

    const o = data.reduce((acc, item) => {
        const [_, itemName, int1From, int1To, int2From, int2To] = item.match(reg);
        acc[itemName] = [
            {from: +int1From, to: +int1To},
            {from: +int2From, to: +int2To},
        ]
        return acc;
    }, {})

    return o;
}  

const nearbyParse = (input) => {
    const data = input.split(/\r?\n/);
    data.shift();

    return data.map(line => line.split(',').map(i => +i));
}  


const numberIsValid = (validations, number) => {
    const intervals = Object.values(validations).flatMap(x => x);

    return intervals
        .map(interval => interval.from <= number && interval.to >= number)
        .includes(true);
}

const parseBlocks = (input) => input.split(/\r?\n\r?\n/)

console.log(ticketWithRightFields(data));

module.exports = {
    validationsParse,
    parseBlocks,
    numberIsValid,
    nearbyParse,
    ticketScanningErrorRate
}

