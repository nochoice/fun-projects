// --- Day 1: Report Repair ---
const fs = require('fs');

const data = fs.readFileSync('./2020/data/01.txt', {encoding:'utf8', flag:'r'});

const repair = (input, sum) => {
    const map = new Map()
    const data = input.split('\n').map(a => +a);
    let num;

    for (let i=0; i<data.length; i++) {
        num = data[i];
        const diff = sum - num;

        if(map.has(diff)) {
            break;
        } else {
            map.set(num);
        }
    }
    

    return num * (sum - num);
}

const repairAny = (input, sum) => {
    const data = input.split('\n').map(a => +a).sort((a, b) => a - b);
    let aNum, bNum, cNum;
    let isFound = false;
    // rework for any kind of length
    for(let a = 0; a < data.length - 2 ; a++) {
        if(isFound) break;
        aNum = data[a];
        for(let b = 1; b < data.length - 1 ; b++) {
            if(isFound) break;
            bNum = data[b];

            for(let c = 2; c < data.length ; c++) {
                cNum = data[c];

                if(aNum + bNum + cNum === sum) {
                    isFound = true;
                    break;
                } 
                
                if (aNum + bNum + cNum > sum) {
                    break;
                }
            }
        }
    }

    return aNum * bNum * cNum;
}

// console.log('Day 01 - 1: ', repair(data, 2020));
// console.log('Day 01 - 2: ',repairAny(data, 2020));

module.exports = {
    repair,
    repairAny
};