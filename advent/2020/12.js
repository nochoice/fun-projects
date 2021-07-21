const fs = require('fs');

const data = fs.readFileSync('./2020/data/12.txt', {encoding:'utf8', flag:'r'});


const changeDirection = (currentDirection, turnTo, degree) => {
    const turnLeft = ['N', 'W', 'S', 'E'];
    const turnRight = ['N', 'E', 'S', 'W'];
    const turning = turnTo === 'R' ? turnRight : turnLeft;
    const turns = degree / 90;
    const pos = turning.indexOf(currentDirection);
    const nextPos = pos + turns;
    
    return turning[nextPos % 4];
} 

const getDistance = (input) => {
    let direction = 'E';
    let position = [0, 0];
    let wayPoint = [10, 1];

    const data = parseInput(input);

    data.forEach(ins => {
        if(ins[0] === 'R' || ins[0] === 'L') {
            direction = changeDirection(direction, ins[0], ins[1])
        }

        if(ins[0] === 'F') {
            [position, wayPoint] = moveWithWayPoint(position, wayPoint ,direction, ins[1]);
        }

        if(ins[0] === 'E' || ins[0] === 'W' || ins[0] === 'N' || ins[0] === 'S') {
            position = move(position ,ins[0] , ins[1]);
        }
    });

    return Math.abs(position[0]) + Math.abs(position[1]) 
}


const getDistanceWithWayPoint = (input) => {
    let coords = [0, 0];
    let waypoint = [1, 10];

    const data = parseInput(input);

    data.forEach(instruction => {
        let action = instruction[0];
        let value = instruction[1];
    
        if (action === 'N') { waypoint[0] += value }
        else if (action === 'S') { waypoint[0] -= value}
        else if (action === 'E') {waypoint[1] += value}
        else if (action === 'W') (waypoint[1] -= value)
        else if (action === 'L') {
            let new_waypoint = [];

            for (let i = 0; i < value / 90; i++) {
                new_waypoint[1] = -waypoint[0];
                new_waypoint[0] = waypoint[1];
                waypoint = new_waypoint;
            }

        }

        else if (action === 'R') {
            let new_waypoint = [];
            // console.log(waypoint);

            for (let i = 0; i < value / 90; i++) {
                new_waypoint[1] = waypoint[0]
                new_waypoint[0] = -waypoint[1]
                waypoint = new_waypoint
            }
            // console.log(waypoint);
        }
           
                
        else if (action === 'F') {
            coords = [coords[0] + waypoint[0] * value, coords[1] + waypoint[1] * value];
        }
            
    })

    console.log(coords)

    const result = Math.abs(coords[0]) + Math.abs(coords[1]);
    return result
}

const move = (position, direction, steps) => {
    if (direction === 'E') return [position[0] + steps, position[1]];
    if (direction === 'W') return [position[0] - steps, position[1]];
    if (direction === 'N') return [position[0], position[1] - steps];
    if (direction === 'S') return [position[0], position[1] + steps];
}

const parseInput = (input) => input.split(/\r?\n/).map(line => {
    const p = line.match(/(.)(\d*)/);

    return [p[1], +p[2]]
});

// console.log(getDistanceWithWayPoint(data))

module.exports = {
    getDistance,
    getDistanceWithWayPoint,
    parseInput,
    changeDirection,
    move
}

56920

27972