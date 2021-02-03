cleanString = (s) => s
                .split('')
                .reduce((acc, ch) => { 
                    ch === '#' ? acc.pop() : acc.push(ch);
                    return acc;
                }, [])
                .join('');


console.log(cleanString('Kata######m#an'));