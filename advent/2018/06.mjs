import {splitLine, splitLineToNum} from '../../lib/utils/array/split-line';
import {readFile} from '../../lib/files/read-file';

const data = splitLine(readFile(`advent/2018/data/06`), '\r\n');
const getCoordinates = (data) => data.map(coord => {
    const [x, y] = coord.split(', ');
    return {x: +x, y: +y}
});

const canvasSize = (coords) => {
    return coords.reduce((acc, coord) => {
        acc.x = (acc.x < coord.x) ? coord.x : acc.x;
        acc.y = (acc.y < coord.y) ? coord.y : acc.y;
        return acc;
    }, {x: 0, y: 0});
}

const coords = getCoordinates(data);
const matrix = [];

const manhatan = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const generateCanvas = (coords) => {
    const canvas = [];
    const size = canvasSize(coords);

    for (let y=0; y<size.y + 2; y++) {
        for (let x=0; x<size.x + 2; x++) {
            canvas[y] = canvas[y] || [];
            const distances = coords.map((coord, i) => ({id: i, type: 0, finite: true, distance: manhatan({x: x,y: y}, {x: coord.x, y: coord.y})}));

            canvas[y][x] = canvas[y][x] || [];
            canvas[y][x] = distances;
        }
    }

    return canvas;
};

const minDistance = (distances) => {
    // console.log(distances);

    const minDist =  distances.reduce((acc, dist) => {
        if (acc.distance > dist.distance) acc = dist;

        return acc;
    },{distance: 10000000});

    return distances.filter(dist => dist.distance === minDist.distance);


}

const flatCanvas = (canvas) => {
    for (let y=0; y<canvas.length; y++) {
        for (let x=0; x<canvas[y].length; x++) {
            canvas[y][x] = minDistance(canvas[y][x]);
        }
    }

    return canvas;
};

const spin = (canvas, func) => {
    for (let y=0; y<canvas.length; y++) {
        for (let x=0; x<canvas[y].length; x++) {
            func(canvas[y][x])
        }
    }
}

const getIdsOnBorder = (canvas) => {
    const borders = [];

    const idRet = (arr) => (arr.length === 1) ? arr[0].id : undefined;

    for (let y=0; y<canvas.length; y++) {
        borders.push(idRet(canvas[y][0]));
        borders.push(idRet(canvas[y][canvas[0].length - 1]));
    }

    for (let x=0; x<canvas[0].length; x++) {
        borders.push(idRet(canvas[0][x]));
        borders.push(idRet(canvas[canvas.length-1][x]));
    }

    return Array.from(new Set(borders.filter(item => item != undefined)));
};



const reduceCanvas = (canvas) => {
    for (let y=0; y<canvas.length; y++) {
        let line = '';
        for (let x=0; x<canvas[y].length; x++) {
            canvas[y][x] = (canvas[y][x].length === 1) ? canvas[y][x][0].id : '.';
        }
    }

    return canvas;
}


// console.log(canvasSize(coords));

// const fillCanvas = (canvas, coords)

// console.log(coords);

const canvas = generateCanvas(coords);

// console.log(getIdsOnBorder(flatCanvas(canvas)));

const count1 = () => {
    const canvas = reduceCanvas(flatCanvas(generateCanvas(coords)));
    const borders = getIdsOnBorder(flatCanvas(generateCanvas(coords)));

    const map = {};
    console.log(borders);

    for (let y=0; y<canvas.length; y++) {
        for (let x=0; x<canvas[y].length; x++) {
            map[canvas[y][x]] = map[canvas[y][x]] || 0;
            map[canvas[y][x]]++;
        }
    }

    const notInfinitKeys = Object.keys(map).filter((key => !borders.includes(+key))).filter(item => item != '.').map(item => +item)
    console.log(notInfinitKeys);

    const o = notInfinitKeys.reduce((acc, key) => {
        if (map[key] > acc.max) {
            acc.max = map[key];
            acc.key = key;
        }

        return acc;
    }, {max: 0, key: 'e'});

    console.log(o);
};

const count2 = () => {
    const size = canvasSize(coords);
    const maxDistance = 10000;
    const result = [];
    for (let y=0; y<size.y + 2; y++) {
        for (let x=0; x<size.x + 2; x++) {
            let sumDist = 0;
            for (let c=0; c<coords.length; c++) {
                const dist = manhatan({x,y}, coords[c]);
                sumDist += dist;
            }
            if(sumDist < maxDistance) result.push(0);
            // console.log(sumDist);
        }
    }

    return result.length;
}


console.log(count2());
// count1();

// console.log(manhatan({x: 2, y: 8}, {x: 1, y: 1}));




