const fs = require('fs');

const data = fs.readFileSync('./2020/data/02.txt', {encoding:'utf8', flag:'r'});

const numOfValidPass = (input) => {
    const data = input.split('\n');
    const regex = /(\d*)-(\d*) (.): (.*)/;
    const p = data
                .map((l) => {
                    const m = regex.exec(l);
                    return checkPass(m[4], m[3], m[1], m[2]);
                })
                .filter(i => i === true)
                .length;

    return p;
}



const checkPass = (pass, character, min, max) => {
    const p = pass.split('').reduce((acc, item) => {
        if (!acc[item]) acc[item] = 0;
        acc[item]++;
        return acc;
    }, {});

    const result = p[character] >= min && p[character] <= max;

    return result;
}

const checkPassCorporate = (pass, character, pos1, pos2) => {
    const ch1 = pass[pos1-1];
    const ch2 = pass[pos2-1];
    return (ch1 === character || ch2 === character) && !(ch1 === character && ch2 === character) 

}

const numOfValidPassCorporate = (input) => {
    const data = input.split('\n');
    const regex = /(\d*)-(\d*) (.): (.*)/;
    const p = data
                .map((l) => {
                    const m = regex.exec(l);
                    return checkPassCorporate(m[4], m[3], m[1], m[2]);
                })
                .filter(i => i === true)
                .length;

    return p;
}

// console.log(numOfValidPass(data))

module.exports = {
    numOfNotValidPass: numOfValidPass,
    checkPass,
    checkPassCorporate,
    numOfValidPassCorporate
}