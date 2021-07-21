const fs = require('fs');

const data = fs.readFileSync('./2020/data/18.txt', {encoding:'utf8', flag:'r'});

const sumOfAll = (input) => {
    const data = input.split(/\r?\n/);

    const o = data
            .map(line => postfixEvaluate(convertToPostfix(line)))
            .reduce((acc, i) => i + acc, 0);
    
    console.log(o);

    return o
}

const precedents = {
    '*': 2,
    '/': 2,
    '+': 3,
    '-': 3,
}

const convertToPostfix = (infix) => {
    const data = infix;

    const output = [];
    const stackOperator = [];

    let index = 0;

    while (index < data.length) {
        const token = data[index];
        
        index ++;
        if (token === ' ') continue;

        if (isNumeric(token)) {
            output.push(+token)
        } 
        if (isOperator(token)) {
            let top = stackOperator[stackOperator.length - 1];

            if (isOperator(top)) {
                // console.log(precedents[top] > precedents[token])
                while (precedents[top] > precedents[token]) {
                    const op = stackOperator.pop();
                    output.push(op);
                    top = stackOperator[stackOperator.length - 1];
                }
            }
            stackOperator.push(token)
        }

        if (token === '(') {
            stackOperator.push(token);
        }

        if (token === ')') {
            let op;
            do {
               op = stackOperator.pop();
               output.push(op);
            } while (op !== '(')
            output.pop();
        }
    }

    while (stackOperator.length) {
        const op = stackOperator.pop();
        output.push(op);
    }
    
    return output;
}

const postfixEvaluate = (pf) => {
    const operandStack = [];

    let index = 0;

    while (index < pf.length) {
        const token = pf[index];
        if (!isNaN(token)) {
            operandStack.push(token);
        }
        else {
            const op2 = operandStack.pop();
            const op1 = operandStack.pop();

            const result = doTheOperation(token, op1, op2);
            operandStack.push(result)
        }

        index++;
    }

    return operandStack[0];
}

const doTheOperation = (op, op1, op2) => {
    const map = {
        '+': op1 + op2,
        '-': op1 - op2,
        '*': op1 * op2,
        '/': op1 / op2,
    }

    return map[op];
}


const isOperator = (str) => ['+', '-', '*', '/'].includes(str);

const  isNumeric = (str) => {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

sumOfAll(data);

module.exports = {
    postfixEvaluate,
    convertToPostfix,
    isOperator
}
