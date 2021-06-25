const fs = require('fs');

const data = fs.readFileSync('./2020/data/10.txt', {encoding:'utf8', flag:'r'});

const useAllAndCountDiff = (input) => {
    let data = parseInput(input).map((i) => +i);
    data.push(0);
    data = data.sort((a,b) => a-b);

    // console.log(data);

    const p = data.reduce((acc, item, index, arr) => {
        const diff = arr[index + 1] - item;
        if (!diff) return acc;

        if (!acc[diff]) { 
            acc[diff] = 0
        }
        acc[diff] += 1;

        return acc;
    }, {})

    p[3]++;

    return p[1] * p[3] ;
}

const parseInput = (input) => input.split(/\r?\n/).map(i => +i);


// tooo slow


const countNodes = (input => {
    let data = parseInput(input).map((i) => +i);
    const MEM = {};
    data.push(0);
    data.sort((a,b) => a-b);
    data.push(data[data.length - 1] + 3);

    const l = data.length;
    // console.log(l);

    const rec = (fromIndex) => {
        let out = 0;

        if(fromIndex >= l - 1) { return 1 };
        if(MEM[fromIndex]) { return MEM[fromIndex] };

        for(let i=1; i<=3; i++) {
            if(data[fromIndex+i] - data[fromIndex] <= 3) {
                out += rec(fromIndex+i);
            }
        }

        MEM[fromIndex] = out;
        
        return out
    }


    const g = rec(0);

    // console.log(g);

    return g;
});

// console.log(countNodes(data));

module.exports = {
    useAllAndCountDiff,
    countNodes
}