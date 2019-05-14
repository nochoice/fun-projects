// const fibonacci = (arg) => {

//     const memo = {};
//     const inFib = (n) => {
//         if(n==0 || n == 1) return n;

//         return inFib(n-1) + inFib(n-2);
//     }

//     return inFib
    
// }


let fibonacci = (n) => {
        if(n==0 || n == 1) return n;
        return fibonacci(n-1) + fibonacci(n-2);
}

const  memo = (func) => {
    var cache = {};
    
    return () => {
        let key = JSON.stringify(arguments);
        if (cache[key]){ return cache[key]; }
        else{
            let val = func.apply(null, arguments);
            cache[key] = val;
            return val; 
        }
    }
  }

fibonacci = memo(fibonacci);

console.log(fibonacci(1));