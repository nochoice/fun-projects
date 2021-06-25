const fs = require('fs');

const data = fs.readFileSync('./2020/data/07.txt', {encoding:'utf8', flag:'r'});

const countContainBag = (input) => {
    const data = parseInput(input);

    const parsed = data.reduce((acc, line) => {
        return ({...acc, ...parseLine(line)});
    }, {});

    const p = result1(parsed, 'shiny gold bag');
    
    return p
}

const result1 = (parsed, bag) => {
    const o = findTheParents(parsed, bag);
    return new Set(o).size;
}

const findTheParents = (parsed, bag) => {
    let count = [];

    Object.keys(parsed).forEach(key =>{
        const has = !!hasChild(parsed[key], bag).length;

        has 
                ? count = [key, ...count, ...findTheParents(parsed, key)]
                : []
    });

    return count;
}

const hasChild = (parent, bag) => parent.filter((a) => a.node === bag);
const parseInput = (input) => input.split(/\r?\n/);
const parseLine = (input) => {
    const [from, to] = input.split('s contain ');

    return {[from]: parseTo(to)};
};

const parseTo = (to) => {
    const p = to.split(', ');
    const r = /(\d*) (.*)/;

    return (p[0] === 'no other bags.') 
            ? []
            : p.map(i => {
                const w = i.match(r);
                return {
                    count: +w[1],
                    node: sanitizeBag(w[2])
                }
            });
}


const sanitizeBag = (name) => {
    const o = name.split(' ');
    o.pop();
    o.push('bag');
    return o.join(' ');
}

// console.log(countContainBag(data));

module.exports = {
    countContainBag
}