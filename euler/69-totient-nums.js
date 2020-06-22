const numsNotDivided = (num) => {
    const nums = [1];
    for (let i = 2; i < num; i++) {

        if ((gcd(num, i)) === 1) nums.push(i);
    }
    return nums
}


const gcd = (x, y) => {
    if ((typeof x !== 'number') || (typeof y !== 'number')) 
      return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while(y) {
      var t = y;
      y = x % y;
      x = t;
    }
    return x;
  }

console.time();

// const map = {};
// for (let i=1; i<=20000; i++) {
//     map[i] = i / numsNotDivided(i).length;

//     if (i%10000 === 0 ) console.log(i);
// }

// let result = Object.keys(map).reduce((acc, k) =>{
//     if(acc.value < map[k]) {
//         acc.key = k;
//         acc.value = map[k];
//     }

//     return acc;
// }, {key: 0, value: 0});

function solution(L) {
  var n = 1, k = 0;
  var primes = [2, 3, 5, 7, 11, 13, 17, 19, 21, 23, 29, 31];
  while (primes[k] * n <= L)
    n*= primes[k++];
  return n;
}



console.log(solution(1000000));
console.timeEnd()