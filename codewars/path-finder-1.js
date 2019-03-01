const pathFinder = (maze) => {
    maze = parseMaze(maze);

    const start = [0, 0];
    const end = [maze[0].length -1, maze.length-1];

    console.log(start,end);

    return maze;
}

const visit = (maze, position, visited) => {
    const place = maze[position[1]][position[0]];
    visited.push(`${position[0]},${position[1]}`);

    
}

const parseMaze = (maze) => maze.split('\n').map(line => line.split(''));

console.log(pathFinder(`.W.
.W.
...`))