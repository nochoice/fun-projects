const dividers = (num, withSelf) => {
    const result = [];

    for (let i=1; i<=(num/2); i++) {
        if((num % i) === 0) {
            result.push(i);
        }
    }

    if (withSelf) result.push(num);

    return result;
}

const sumOfDividers = (arr) => arr.reduce((acc, num) => acc += num, 0);

const findAmicable = (tillNumber) => {
    const amic = [];
    for (let i = 1; i <= tillNumber; i++) {
        const d1 = dividers(i);
        const sumD1 = sumOfDividers(d1);

        const d2 = dividers(sumD1);
        const sumD2 = sumOfDividers(d2);

        if (i === sumD2 && !arraysEqual(d1, d2)) {
            amic.push(i);
        }
    }

    return amic
}

const arraysEqual = (a1,a2) => JSON.stringify(a1) === JSON.stringify(a2);

const result = findAmicable(10000)
                .reduce((acc, num) => acc + +num, 0);


exports.dividers = dividers;
exports.sumOfDividers = sumOfDividers;
