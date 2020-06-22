console.log('White space integers');

const whitespaceNumber = (n) => {
    if (n === 0) return ' \n';

    const output = [];
    const isNegative = n < 0;
    
    output.push((isNegative ? '\t' : ' '))
    
    Math.abs(n).toString(2).split('').forEach(element =>  output.push((element === '0') ? ' ' : '\t'));

    output.push('\n');

    return output;
}

console.log(whitespaceNumber(-3));