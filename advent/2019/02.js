const code = '1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,2,19,13,23,1,23,10,27,1,13,27,31,2,31,10,35,1,35,9,39,1,39,13,43,1,13,43,47,1,47,13,51,1,13,51,55,1,5,55,59,2,10,59,63,1,9,63,67,1,6,67,71,2,71,13,75,2,75,13,79,1,79,9,83,2,83,10,87,1,9,87,91,1,6,91,95,1,95,10,99,1,99,13,103,1,13,103,107,2,13,107,111,1,111,9,115,2,115,10,119,1,119,5,123,1,123,2,127,1,127,5,0,99,2,14,0,0';
const splitIt = (code) => code.split(',').map(x => +x);
const apply = (code, position) => {
    code = coerceCode(code);

    const operation = instructions[code[position]];

    return operation(code, position);
}

const coerceCode = (code) => Array.isArray(code) ? code : splitIt(code);

const run = (code, position) => {
    let i = 0;
    code = coerceCode(code);
    while(code[position] !== 99) {
        apply(code, position);
        position += 4;
        i++;
    }

    return code;
}

const instructions = {
    1: (code, position) => {
        
        code[code[position+3]] = code[code[position+1]] + code[code[position+2]];
        return code;
    }, 
    2: (code, position) => {
        code[code[position+3]] = code[code[position+1]] * code[code[position+2]];
        return code;
    }
}

const updateCode = (code, noun, verb) => {
    code = coerceCode(code);

    code[1] = noun;
    code[2] = verb;

    return code;
}

// console.log(run(updateCode(code, 12, 2), 0)[0])

let out;
for (let noun=0; noun<100; noun++) {
    for (let verb=0; verb<100; verb++) {
        if(run(updateCode(code, noun, verb), 0)[0] === 19690720) {
            out = 100 * noun + verb;
            console.log('AA');
            break;
        }
    }
   
}

console.log(out);


exports.apply = apply;
exports.run = run;
