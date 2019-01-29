GRID_SERIAL_NUMBER = 3463; 
GRID_SIZE = 300;

createFuelGrid = (x, y, gsn) => {
    const grid = [];
    for(let yy = 1; yy<= y; yy++) {
        grid[yy] = [];
        for(let xx = 1; xx<= x; xx++) {
            grid[yy][xx] = gridCellValue(xx, yy, gsn);
        }
    }

    return grid;
};

fuelGridNormalize = (grid) => {
    return grid
        .filter(row => row.length)
        .map(row => row.filter(item => item !== undefined));
};

gridCellValue = (x, y, gsn) => {
    const rackId = x+10;
    const powerLevel = rackId * y;
    let num = (gsn + powerLevel) * rackId;

    num = (num + '').split('').reverse()[2] || 0;

    return num - 5;
};

getMaxGridSizes = (grid, size) => {
    const arr = [];
    for (let yy=0; yy<grid.length - size; yy++) {
        for (let xx=0; xx<grid[0].length - size; xx++) {
            arr.push({
                x: xx + 1,
                y: yy + 1,
                max: getAreaSum(grid, xx, yy, size),
                size
            });
        }
    }

    return arr.reduce((acc, item) => (item.max > acc.max) ? item : acc, {max: -Infinity});
};

getAreaSum = (grid, x, y, size) => {
    let sum = 0;
    for (let yy=0; yy<=size; yy++) {
        for (let xx=0; xx<=size ; xx++) {
            sum += grid[y+yy][x + xx];
        }
    }

    return sum;
};

part2 = () => {
    const g = createFuelGrid(GRID_SIZE, GRID_SIZE, GRID_SERIAL_NUMBER);

    const normalizedGrid = fuelGridNormalize(g);

    const arr = [];
    for (let i=1; i<20; i++) {
        let o = getMaxGridSizes(normalizedGrid, i);
        arr.push(o);
    }

    return arr.reduce((acc, item) => (item.max > acc.max) ? item : acc, {max: -Infinity});
};

console.log(part2());