import { Space, SpaceItem, SpaceState } from './interfaces/space';

const runDecorators = (context, items: SpaceItem[]) => {
    items.forEach(item => {
        item.decorators.forEach(decorator => {
            decorator(context, item)
        })
    });
}

const move = (vector: number[], steps: number = 10) => {
    console.log(Array(steps).fill(5));
    return (_ctx: CanvasRenderingContext2D, item: SpaceItem) => {
        item.vector[0] += vector[0];
        item.vector[1] += vector[1];

        item.startPoint[0] += vector[0];
        item.startPoint[1] += vector[1];

    } 
} 

const scale = (context: CanvasRenderingContext2D, item: SpaceItem) => {

}
 

const rotate = (context: CanvasRenderingContext2D, item: SpaceItem) => {
    const matrix = [
        [0, 1], 
        [-1, 0]
    ];

    transform(item, matrix);
}

const flipX = (context: CanvasRenderingContext2D, item: SpaceItem) => {
    const matrix = [
        [-1, 0], 
        [0, 1]
    ];

    transform(item, matrix);
}

const transform = (item: SpaceItem, matrix: number[][]) => {
    const x = matrix[0][0] * item.vector[0] + matrix[0][1]*item.vector[1];
    const y = matrix[1][0] * item.vector[0] + matrix[1][1]*item.vector[1];

    item.vector[0] = x;
    item.vector[1] = y;

    return item;
}


const line = (context: CanvasRenderingContext2D, item: SpaceItem) => {
    context.beginPath();

    const start = vectorDrawposition(item.startPoint);
    const end = vectorDrawposition(item.vector);

    context.moveTo(start[0], start[1]);
    context.lineTo(end[0], end[1]);
    context.stroke();
}

const circleEnd = (ctx: CanvasRenderingContext2D, item: SpaceItem) => {
    circle(ctx, vectorDrawposition(item.vector), 5)
}

const circle = (ctx: CanvasRenderingContext2D, center: number[], width) => {
    ctx.fillStyle= "blue";
    ctx.beginPath();
    ctx.arc(center[0], center[1], 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill()
}


const prepareState = (state: SpaceState) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    state.context = context;
    state.canvas = canvas;

    context.lineWidth = 1;
    
    state.spaces[0].properties.startPoint = [200, 200]

    state.spaces.forEach((space: Space) => {
        space.items.forEach(item => {
            item.startPoint = [0, 0]
        });
    });

    return state;
}


const state: SpaceState = {
    context: null,
    canvas: null,
    spaces: [{
        properties: {
            startPoint: [250,250],
            gage: 20
        },
        items: [
            {
                vector: [-450, 0],
                decorators: [line]
            },{
                vector: [0, 250],
                decorators: [line]
            },{
                vector: [450, 0],
                decorators: [line]
            },{
                vector: [0, -250],
                decorators: [line]
            },
            {
                vector: [200, 70],
                decorators: [circleEnd]
            },{
                vector: [20, 200],
                decorators: [circleEnd]
            },{
                vector: [90, -200],
                decorators: [circleEnd]
            },{
                vector: [-200, -200],
                decorators: [line, circleEnd]
            }
        ],
        modificators: [move([30, 30])],  //
        spaces: []
    }]
};

const draw = (state) => {
    state.spaces.forEach((space: Space) => {
        runDecorators(state.context, space.items)
    })
}

const applyModificators = (state) => {
    state.spaces.forEach((space: Space) => {
        space.modificators.forEach(modificator => {
    
            space.items.forEach(item => {
                modificator(state.context, item);

                // runDecorators(state.context, space.items)
            })
        });
    })
}

const clean = (state: SpaceState) => {
    const { width, height } = state.canvas.getBoundingClientRect();
    state.context.clearRect(0, 0, width, height);
}

// new MathApp()
prepareState(state);
const vectorDrawposition = ((state) => (point) => [point[0] + 200, point[1] +200])(state)

window.requestAnimationFrame(gameLoop);


let secondsPassed;
let oldTimeStamp;
let fps;

function gameLoop(timeStamp){

    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    //Calculate fps
    fps = Math.round(1 / secondsPassed);

    clean(state);
    applyModificators(state);
    draw(state);

    state.context.font = '25px Arial';
    state.context.fillStyle = 'black';
    state.context.fillText("FPS: " + fps, 10, 30);

    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}