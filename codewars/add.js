const add = (a, b) => {
    const aa = a.split('').map(a => +a).reverse();
    const bb = b.split('').map(a => +a).reverse();
    const size = (aa.length > bb.length) ? aa.length : bb.length;
    const result = [];
    
    let rest = 0;

    for (let i=0; i<size; i++) {
        const sum = (aa[i] || 0) + (bb[i] || 0) + rest;
        rest = Math.floor(sum / 10);
        result.push(sum % 10);
    }

    if (rest) result.push(rest); 

    return result.reverse().join('');
}

console.log(add("55", "66"))