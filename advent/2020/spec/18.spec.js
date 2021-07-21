const { convertToPostfix, isOperator, postfixEvaluate} = require('../18');

fdescribe('Day 18', () => {
    it('should create a postfix without precedence', () =>{
        // expect(convertToPostfix('1 + (2 * 3) + (4 * (5 + 6))')).toEqual([1, 2, 3, '*', 4, 5, 6, '+', '*', '+', '+']);
        // expect(convertToPostfix('(1 + 2)')).toEqual([1, 2, '+']);
        // expect(convertToPostfix('1 + 2 * 3')).toEqual([1, 2, 3, '*', '+']);
    });

    it('should evaluate postfix', () =>{
        
        const pf = convertToPostfix('1 + (2 * 3) + (4 * (5 + 6))');
        expect(postfixEvaluate(pf)).toEqual(51);
        
        const pf2 = convertToPostfix('2 * 3 + (4 * 5)');
        expect(postfixEvaluate(pf2)).toEqual(46);
        
        const pf3 = convertToPostfix('5 + (8 * 3 + 9 + 3 * 4 * 3)');
        expect(postfixEvaluate(pf3)).toEqual(1445);
        
        
        const pf4 = convertToPostfix('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))');
        expect(postfixEvaluate(pf4)).toEqual(669060);
        
        const pf5 = convertToPostfix('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2');
        expect(postfixEvaluate(pf5)).toEqual(23340);
        
        const pf6 = convertToPostfix('1 + 2 * 3 + 4 * 5 + 6');
        expect(postfixEvaluate(pf6)).toEqual(231);
    });

    it('should check if it is operator', () => {
        expect(isOperator('*')).toBeTruthy();
        expect(isOperator('-')).toBeTruthy();
        expect(isOperator('+')).toBeTruthy();
        expect(isOperator('/')).toBeTruthy();
        expect(isOperator(' ')).toBeFalsy();
        expect(isOperator('(')).toBeFalsy();
    })
});
