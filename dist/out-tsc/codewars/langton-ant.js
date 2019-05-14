;
var directions = {
    'N': { x: 0, y: -1 },
    'E': { x: 0, y: 1 },
    'W': { x: -1, y: 0 },
    'S': { x: 1, y: 0 }
};
var turn = function (point, turnTo) {
    if (turnTo === 'L') {
        var map = { N: 'W', W: 'S', S: 'E', E: 'N' };
        point.direction = map[point.direction];
    }
    if (turnTo === 'R') {
        var map = { N: 'E', E: 'S', S: 'W', W: 'N' };
        point.direction = map[point.direction];
    }
    return point;
};
var step = function (point, size) {
    if (size === void 0) { size = 1; }
    point.x += (directions[point.direction].x * size);
    point.y += (directions[point.direction].y * size);
    return point;
};
var p = {
    visited: false,
    x: 10,
    y: 10,
    direction: 'S'
};
var strategyBool = function (point) {
    var current = Object.assign({}, point);
    var next;
    if (current.visited) {
        current = turn(current, 'R');
    }
    else {
        current = turn(current, 'L');
    }
    next = step(current);
    current.visited = !current.visited;
    return {
        current: point,
        next: next
    };
};
var langtonAnt = function (strategy, currentPoint, numOfItteration) {
    var matrix = {};
    for (var i = 0; i < numOfItteration; i++) {
        var s = strategy(currentPoint);
        matrix["[" + s.current.x + "]-[" + s.current.y + "]"] = s.current;
        currentPoint = matrix["[" + s.next.x + "]-[" + s.next.y + "]"] || s.next;
        if (matrix["[" + s.next.x + "]-[" + s.next.y + "]"]) {
            currentPoint.direction = s.next.direction;
        }
        console.log(s.current);
    }
    return matrix;
};
var out = langtonAnt(strategyBool, p, 20);
console.log(out);
//# sourceMappingURL=langton-ant.js.map