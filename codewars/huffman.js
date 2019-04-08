
const frequencies = (s) => {
    const map = s.split('').reduce((acc, item) => {
        acc[item] = acc[item] || 0;
        acc[item]++;

        return acc;
    }, {});

    return Object
        .keys(map)
        .map(item => [item, map[item]])
        .sort((a, b) => a[1] < b[1]);
};

const encode = (freqs,s) => {
    const vls = generateVLS(freqs);

    return s
        .split('')
        .map(item => vls[item])
        .join('');
};


const decode = (freqs, bits) => {
    const vls = generateVLS(freqs);
    const vlsRev = Object.keys(vls).reduce((acc, item) => {
        acc[vls[item]] = item;
        return acc;
    }, {});

    let bitsFragment = '';

    return bits.split('').map(bit => {
        bitsFragment += bit;

     
        if (vlsRev[bitsFragment]) {
            const r = vlsRev[bitsFragment];
            bitsFragment = '';

            return r;
            
        } else return '';

    }).join('');
};

const generateVLS = (freq) => {
    const o = {};
    let acc = '1';

    o[freq[0][0]] = '0';

    for (let i=1; i<freq.length; i+=2) {
        const i1 = freq[i];
        const i2 = freq[i + 1];
        
        o[i1[0]] = acc + '0';
     
        if (i2) o[i2[0]] = acc + '1';
        acc += '1'; 
    }

    return o;
};

const str = 'romansadfdfasfasdfasdfasdfasdfasdfasdfdsfasdf';
const e = encode(frequencies(str),str);
const d = decode(frequencies(str),e);

console.log(d);

// console.log(generateVLS(frequencies('asaaaaasssaweeeeeeeeeeeewwwwwwwwwqdsadashfdkjasfh asdfhasduhfasdhfhfgasdhfi')));