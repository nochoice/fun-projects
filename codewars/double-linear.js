const dblLinear = (position) => {
    const arr = [1];
    const till = position;
    let i = 0;


    while (arr.length <= position + 1) {
        const x = arr[i];
        const y = 2*x + 1;
        const z = 3*x + 1;

        console.log(y, z)
        
        arr.push(y);
        arr.push(z);
        i = i + 1;
    }

    const deduped = [...new Set(arr)];

    console.log(deduped.sort((a, b) => {
       if (+a > +b) return 1;
       if (+a < +b) return -1;
       if (+a === +b) return 0;

    }))

    return deduped.sort((a, b) => (+a > +b) ? 1 : -1)[position-1];
}

console.log(dblLinear(50))
