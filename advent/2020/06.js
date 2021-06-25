const { group } = require('console');
const fs = require('fs');

const data = fs.readFileSync('./2020/data/06.txt', {encoding:'utf8', flag:'r'});

const getGroups = (input) => {
    const lines = input.split(/\r?\n/);

    let group = [];
    let out = [];

    for (let i=0; i<lines.length; i++) {
        const line = lines[i];

        if(line !== '') {
            group.push(line);
        } else {
            out.push(group);
            group = [];
        }
    } 
    out.push(group);

    return out
}

const groupYes = (group) => {
    const p = group.reduce((acc, personAnswers) => {
        personAnswers.split('').forEach((ans) => acc[ans] = (acc[ans]) ? acc[ans] + 1 : 1);

        return acc;
    }, {});

    return p;
}

const result1 = (input) => {
    const gs = getGroups(input);

    const p = gs
                .map((g) => groupYes(g))
                .reduce((acc, ans) => acc + Object.keys(ans).length, 0)

    return p;
}

const result2 = (input) => {
    const gs = getGroups(input);
    const p = gs
                .map((g) => countSameInGroup(g))
                .reduce((acc, ans) => acc + ans, 0)

    return p;   
}


const countSameInGroup = (g) => {
    if (g.length === 1) {
        const p = g[0].split('').reduce((acc, k) => {
            acc[k]= '';
            return acc;
        }, {});

        return Object.keys(p).length;
    } else {
        const answers = g.reduce((acc, personAnswers) => {
            personAnswers.split('').forEach(a => acc.add(a))
            
            return acc
        }, new Set());

        const o = Array.from(answers)
                .map((answer) => g
                                    .map(ans => ans.includes(answer))
                                    .every((i) => i))
                .filter((i => i)).length;

        return o;
    }
}

// console.log('Day 6 - 1', result1(data));
// console.log('Day 6 - 2', result2(data));

module.exports = {
    getGroups,
    groupYes,
    result1,
    result2,
    countSameInGroup
}