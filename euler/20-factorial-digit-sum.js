const app = require('./13-large-sum');
// import * as app from './16-power-digit-sum.js';
 
const factorial = (num) => {
    let prev = 1;

    for (let i=0; i<num ; i++) {
        let fragment = prev;
        for (j=0; j<i; j++) {
            prev = app.sum(prev, fragment);
        }
    }
    return prev;
}

const sumOfNumbers = (number) => {
    return factorial(number)
                    .split('')
                    .reduce((acc, num) => acc += +num, 0);
}

exports.factorial = factorial;
exports.sumOfNumbers = sumOfNumbers;

// console.log(sumOfNumbers(100));