const fs = require('fs');

const data = fs.readFileSync('./2020/data/04.txt', {encoding:'utf8', flag:'r'});

const required = ['byr', 'iyr' ,'eyr' ,'hgt' ,'hcl' ,'ecl' ,'pid'];
const optional = ['cid'];

const validators = {
    byr: (n) => +n >= 1920 && +n <= 2002,
    iyr: (n) => +n >= 2010 && +n <= 2020,
    eyr: (n) => +n >= 2020 && +n <= 2030,
    hgt: (h) => {
        const re = /(\d*)(in|cm)/;
        const found = h.match(re);
        
        if (!found) return false;
        
        const num = +found[1];
        const jednotka = found[2];

        if (jednotka === 'cm') return num >= 150 && num <= 193 
        if (jednotka === 'in') return num >= 59 && num <= 76 
    },
    hcl: (str) => !!str.match(/#[a-f0-9]{6}/),
    ecl: (c) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(c),
    pid: (str) => !!str.match(/^\d{9}$/)
}

const validPassports = (input) => {
    const data = parse(input);

    const d = data
            // .map((p) => parsePassport(p))
            .map((p) => isValid(p))
            .filter(p => p)
            .length

    return d;
}

const parse = (input) => {
    const data = input.split(/\r?\n/);

    const out = [];
    let passport = '';

    for (let i = 0; i < data.length; i++) {
        const line = data[i];

        if (line) {
            passport += line + ' ';
        } else {

            out.push(passport);
            passport = '';
        }
        
    }
    out.push(passport);

    return out
}

const parsePassport = (passport) => {
    const pass = passport.trim();
    return pass.split(' ').reduce((acc, val) => {
        const [k, v] = val.split(':');
        acc[k] = v;

        return acc;
    }, {});
}

const isValid = (passport) => {
    const pass = parsePassport(passport);
    const hasRequiredFields = required.map((i) => !!pass[i]).every((i) => i === true);

    if (!hasRequiredFields) {
        return false
    }
    else {
        return required
                    .map(i => {
                        
                        if (!validators[i]) return true;

                        // console.log('a', i, validators[i](pass[i]))

                        return validators[i](pass[i]);
                    })
                    .every((i) => i === true);
    }
}

// console.log(validPassports(data));


module.exports = {
    validPassports,
    parsePassport,
    isValid,
    validators
}