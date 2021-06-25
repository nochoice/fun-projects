// --- Day 1: Report Repair ---
const fs = require('fs');

const data = fs.readFileSync('./2020/data/05.txt', {encoding:'utf8', flag:'r'});

const seatId = (input) => {
    const index = 7; 
    const part1 = input.substr(0, index).replace(/B/g, 1).replace(/F/g, 0);
    const part2 = input.substr(index).replace(/R/g, 1).replace(/L/g, 0);  

    return parseInt(part1, 2) * 8 + parseInt(part2, 2)
}

const largestSeatId = (input) => {
    const data = input.split(/\r?\n/);

    return Math.max(...data.map(item => seatId(item)))
}


const findMySeatId = (input) => {
    const data = input.split(/\r?\n/);

    const seats =  data.map(item => seatId(item)).sort();
    let mySeat;

    for (let i=1; i<seats.length; i++) {
        if(seats[i] - seats[i-1] === 2) {
            mySeat = seats[i] - 1;
            break;
        }
    }

    return mySeat;
}
// console.log(findMySeatId(data));


module.exports = {
    seatId
};