const generatePermutations = (number) => {
    const permutations = []
    const digits = new Array(number).fill(0).map((item, index) => index);
    let count = 0;

    while(count < 6) {
        digits.forEach((digit) => {

        })
        count++;
    }

    return []
}


const permutationNext = (permutation) => {
    const pLen = permutation.length;
    let nextPermutation = [...permutation];
    let x = null;
    let y = null;
    let suffix;
    let prefix;

    if(!isHigerPermutation(permutation)) {
        for(let i = pLen - 1; i > 0; i--){
            if (nextPermutation[i] > nextPermutation[i-1]) {
                x = i;
                break;
            }
        }

        prefix = nextPermutation.slice(0, x-1);
        suffix = nextPermutation.slice(x-1, nextPermutation.length);

        for(let i = 1; i <= suffix.length - 1; i++) {
            y = i;
            if(suffix[0] > suffix[i]) {
                y = i - 1;
                break;
            }
        }


        let swap = suffix[0];
        suffix[0] = suffix[y];
        suffix[y] = swap;

        const [head, ...tail] = suffix;

        return [...prefix, head, ...tail.sort()];
    }

    return [];
}

const isHigerPermutation = (permutation) => {
    let isHigher = true;

    for (let i=0; i < permutation.length - 1; i++) {
        if(permutation[i] < permutation[i+1]) {
            isHigher = false;
            break;
        }
    }
    return isHigher;
}


exports.generatePermutations = generatePermutations;
exports.permutationNext = permutationNext;
exports.isHigerPermutation = isHigerPermutation;

// console.log(permutationNext([0,1,2,3,4,5,6,7,8,9]));

let perm = [0,1,2,3,4,5,6,7,8,9];
for (let i = 1; i<1000000; i++) {
    perm = permutationNext(perm)
}

// let perm = [0,1,2];
// for (let i = 1; i<4; i++) {
//     perm = permutationNext(perm)
// }


console.log(perm.join(''));