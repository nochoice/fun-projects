const startingPuzzle = '0,13,1,8,6,15';

const mostRecentlySpoken = (input, position) => {
    const data = input.split(',').map(i => +i);
    const helperMap = createHelperMap(data);

    let lastSpoken = data[data.length - 1];
    let nextPosition = data.length;

    for(let i = nextPosition; i < position; i++) {
        if (!helperMap.has(lastSpoken)) {
            helperMap.set(lastSpoken, i);
            lastSpoken = 0;
        } else {
            const pos = helperMap.get(lastSpoken);
            helperMap.set(lastSpoken, i);
            lastSpoken = (i - pos);
        }

        // help outcome to see slowness
        if (i % 1000000 === 0) {
            console.log('itteration - ', i, helperMap.size)
        } 
    }

    return lastSpoken
}

const createHelperMap = (arr) => {
    let g = [...arr];
    g.pop();

    return g.reduce((acc, item, i) => {
        acc.set(item, i + 1);
        return acc;
    }, new Map())
}

// console.log(mostRecentlySpoken(startingPuzzle, 30000000));


module.exports = {
    mostRecentlySpoken
}

