
const isRightDigitLength = (num, len) => num.toString().length === len;
const sameAdjNumbers = (num) => {
    const str = num.toString();

    let haveSame = false;
    for (let i=0; i<str.length-1; i++) {
        if(str[i] === str[i+1]) {
            haveSame = true;
            break;
        }
        
    }
    return haveSame;
}

const isIncreasing = (num) => {
    const str = num.toString();

    let increasing = true;
    for (let i=0; i<str.length-1; i++) {
        if(str[i] > str[i+1]) {
            increasing = false;
            break;
        }
    }

    return increasing;
}

const hasNopartOfLargeAdj = (num) => {
    let result = false;

    if (sameAdjNumbers(num)) {
        const str = num.toString();
        const adj = {};

        for (let i=0; i<str.length-1; i++) {
            if(str[i] === str[i+1]) {
                if (!adj[str[i]]) adj[str[i]] = 1;

                adj[str[i]]++;
            } 
        }

        const maxAdNum = Math.max(...Object.keys(adj));

        return adj[maxAdNum] < 3;

        
    }

    return result;
}


const numOfPass = (from, to, numSize) => {
    let count = 0;
    for (let i=from; i<=to; i++) {
        if(isRightDigitLength(i, numSize) && sameAdjNumbers(i) && hasNopartOfLargeAdj(i) && isIncreasing(i)) {
            count++;
        }
    }

    return count;
}

const result = numOfPass(284639, 748759, 6);

console.log('04-2', result)

exports.isRightDigitLength = isRightDigitLength;
exports.sameAdjNumbers = sameAdjNumbers;
exports.isIncreasing = isIncreasing;
exports.hasNopartOfLargeAdj = hasNopartOfLargeAdj;