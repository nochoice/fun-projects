const fs = require('fs');

const data = fs.readFileSync('./2020/data/13.txt', {encoding:'utf8', flag:'r'});

const getBestBus = (input) => {
    const [busses, until] = parse(input);

    const o = busses
        .map(b => ({bus: b, p: Math.ceil(until / b)}))
        .map((i) => ({...i, time: i.bus * i.p}))
        .sort((a, b) => a.time - b.time)
        [0]

    return o.bus * (o.time - until)
} 

const parse = (input) => {
    const o = input.split(/\r?\n/);
    return [o[1].split(',').filter(o => o!=='x').map(i => +i), +o[0]]
}

// CHINEESE THEOREM

const chineese = (input) => {
    let data = input
                    .split(/\r?\n/)[1]
                    .split(',')
                    .map((i, itt) => {
                        return ({
                            mod: i,
                            bi: itt
                        })
                    })
                    .filter(i => i.mod !== 'x')
                    .map(i => ({...i, mod: +i.mod}));

    data = [
        { bi: 3, mod: 5 },
        { bi: 1, mod: 7 },
        { bi: 6, mod: 8 }
    ]

    const N =  data.reduce((acc, i) => acc * i.mod, 1);

    data = data.map((i) => ({...i, N: (N/i.mod)}));
    data = data.map((i) => {
        let x = Math.floor(i.N/i.mod) ;
        return ({...i, x})
    });

    console.log(N, data);
}


// for(let i=0; i< 100000000000000; i++) {
//     let o = i;
// } 

// console.log('readyyyy');

/** 
t = 7 * x
t+1 = 13 * y
t+4 = 53 * z
t+6 = 31 * p
t+7 = 19 * q


7 * (x + 1) = 19 * q  


**/

module.exports = {
    getBestBus,
    chineese
}

