interface Point {
    x: number;
    y: number;
    direction: string;
    direction: string;
};

interface BoolPoint extends Point {
    visited: boolean;
}

interface StrategyOut<T> {
    current: T;
    next: T;
}
interface StrategyInterface<T> {
    (point: T): StrategyOut<T>;
}

interface Matrix<T> {
    [key: string]: T;
}

const directions = {
    'N': { x:0,     y:-1 },
    'E': { x:0,     y:1 },
    'W': { x:-1,    y:0 },
    'S': { x:1,     y:0 }
}

const turn = (point: Point, turnTo: 'L' | 'R' | 'C') => {
    if (turnTo === 'L') {
        let map = { N: 'W', W: 'S', S: 'E', E: 'N'};
        
        point.direction = map[point.direction]
    } 

    if (turnTo === 'R') {
        let map = { N: 'E', E: 'S', S: 'W', W: 'N'};

        point.direction = map[point.direction]
    } 

    return point;
}

const step = (point: Point, size = 1) => {

    point.x += (directions[point.direction].x * size); 
    point.y += (directions[point.direction].y * size);

    return point;
}

const p: BoolPoint = {
    visited: false, 
    x: 10, 
    y: 10, 
    direction: 'S'
}

const strategyBool: StrategyInterface<BoolPoint> = (point: BoolPoint) => {
    let current = Object.assign({}, point);
    let next;

    if (current.visited) {
        current = turn(current, 'R')
    } else {
        current = turn(current, 'L')
    }

    next = step(current)
    current.visited = !current.visited;

    return {
        current: point,
        next
    }
};

const langtonAnt = (strategy: StrategyInterface<Point>, currentPoint: Point, numOfItteration: number) => {
    const matrix = {};
    for (let i=0; i<numOfItteration; i++) {
        let s = strategy(currentPoint);
        matrix[`[${s.current.x}]-[${s.current.y}]`] = s.current;

        currentPoint = matrix[`[${s.next.x}]-[${s.next.y}]`] || s.next;

        if (matrix[`[${s.next.x}]-[${s.next.y}]`]) {
            currentPoint.direction = s.next.direction 
        }
        console.log(s.current)
    }
    
    return matrix;
}

const out = langtonAnt(strategyBool, p, 20);

console.log(out);