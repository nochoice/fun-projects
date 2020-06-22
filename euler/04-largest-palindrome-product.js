const isPalindrome = (num) => (''+num) === (''+num).split('').reverse().join('');


const palindrones = []; 
for (i = 100; i < 1000; i++) {
    for (j = 100; j < 1000; j++) {
        let result = i * j;
        if (isPalindrome(result)) palindrones.push(result);
    }
}

console.log(Math.max(...palindrones));