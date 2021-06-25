const { useAllAndCountDiff, countNodes } = require('../10');

const input = `16
10
15
5
1
11
7
19
6
12
4`;

const input2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

describe('Day 10', () => {
    it('should count all 1 jols anf 3 jolts differences', () =>{
        expect(useAllAndCountDiff(input)).toBe(35);
        expect(useAllAndCountDiff(input2)).toBe(220);

    });

    it('should count all 1 jols anf 3 jolts differences', () =>{
        expect(countNodes(input)).toBe(8);
        expect(countNodes(input2)).toBe(19208);
    })
})