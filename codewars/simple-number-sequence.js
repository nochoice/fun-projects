
const missing = (data) => {
    const sequences = [];
    data.split('').forEach((char, i, arr) => sequences.push(sequence(data, i)));

    return sequences;
};

const sequence = (data, size) => {
    let p = data;

    while (p.length) {
        
    } 
    return data;
};
// const isSequence = (sequence) => sequence.reduce((acc,))

console.log(missing("123567"));
// console.log(missing("899091939495"));
// console.log(missing("9899101102"));
// console.log(missing("599600601602"));
// console.log(missing("8990919395"));
