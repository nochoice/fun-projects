const fs = require('fs');

const data = fs.readFileSync('./2020/data/08.txt', {encoding:'utf8', flag:'r'});

const replaced = (input) => {
    const l = parseInput(input).length;
    let p;

    for(let i = 0; i< l; i++) {
        const instructionsList = parseInput(input);
        if (instructionsList[i].includes('jmp')) {
            instructionsList[i] = instructionsList[i].replace('jmp', 'nop');
            p = findLoop(instructionsList.join('\n'));

            if (p.isEnd) {break};

        } else if (instructionsList[i].includes('nop')) {
            instructionsList[i]= instructionsList[i].replace('jmp', 'nop');
            let p = findLoop(instructionsList.join('\n'));

            if (p.isEnd) {break};
        }
    }

    return p;
}


const findLoop = (input) => {
    const instructionsList = parseInput(input);
    let acc = 0;
    let visited = new Set();
    let position = 0;


    while(!visited.has(position) && position < instructionsList.length) {
        const ins = parseInstruction(instructionsList[position]);

        // console.log(position, ins)
        visited.add(position);

        if(ins[0] === 'nop') {
            position++;
        }
        if(ins[0] === 'acc') {
            position++;
            acc += ins[1]
        } 

        if(ins[0] === 'jmp') {
            position += ins[1];
        }
    }
   
    return {acc, isEnd: position === instructionsList.length};
}

const parseInput = (input) => input.split(/\r?\n/);
const parseInstruction = (instruction) => {
    const p = instruction.match(/(\S{3}) ([+-]\d*)/);

    return [p[1], +p[2]];
};

// console.log(findLoop(data));
// console.log(replaced(data));

module.exports = {
    findLoop,
    replaced
}