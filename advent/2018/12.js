/** Test data is ok. but result for input is not good */

input = `initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`;

initState = input.split('\n\n')[0].match(/initial state: (.*)/)[1];
rules = input.split('\n\n')[1].split('\n').map(item => ({pattern: item.split(' => ')[0], result: item.split(' => ')[1]}));

countGeneration = (initState, rules, generations) => {
    let center = 0;
    let nextState = '';
    
    const dots = '......';
    const space = dots.length;
    
    for (let i = 0; i < generations; i++) {
        initState = dots + initState + dots;
        center += space;

        nextState = '';
        for (let j = space ; j <= initState.length - space; j++) {
            const part = getPart(initState, j, 5);
            nextState += returnFromRules(rules, part, 5);
        }

        nextState = dots + nextState + dots;
        initState = nextState;
    }

    return ({initState, center});
};

returnFromRules = (rules, part, size) => {
    const is = rules.filter(item => {
        return item.pattern === part;
    })[0];

    const p = Math.floor(size / 2);
    return (is) ? is.result : '.';
};

getPart = (state, center, size) => {
    const p = Math.floor(size / 2);
    return state.substring(center - p, center + p + 1);
};

const sumPlants = (state, center) => {
    let count = 0;

    for (let i=0; i <= state.length; i++) {
        if(state[i] === '#') count += i - center;
    }

    return count;
};

// console.log(getPart('...#....', 5, 5))

gen = countGeneration(initState, rules, 20);

// console.log(gen.initState);

// console.log(sumPlants(gen.initState, gen.center));
// console.log(gen);

module.exports = {
    sumPlants,
    getPart
};