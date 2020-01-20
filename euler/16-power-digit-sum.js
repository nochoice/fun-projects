const app = require('./13-large-sum');
// import * as app from './16-power-digit-sum.js';
 
const powerTwos = (num, power) => {
     let prev = num;

     for (let i=1; i < power ; i++) {
        prev = app.sum(prev, prev);

     }
    
     return prev;
}

const sumOfNumbers = (number, power) => {
    return powerTwos(number, power)
                    .split('')
                    .reduce((acc, num) => acc += +num, 0);
}

exports.powerTwos = powerTwos;
exports.sumOfNumbers = sumOfNumbers;

// console.log(sumOfNumbers(2, 1000));

