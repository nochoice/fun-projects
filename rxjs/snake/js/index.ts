import { fromEvent, BehaviorSubject, interval, combineLatest } from 'rxjs';
import { map, filter, scan, distinctUntilChanged, startWith, share, withLatestFrom, skip, tap, takeWhile } from 'rxjs/operators';

export const COLS = 30;
export const ROWS = 30;
export const GAP_SIZE = 8;
export const CELL_SIZE = 20;
export const CANVAS_WIDTH = COLS * (CELL_SIZE + GAP_SIZE);
export const CANVAS_HEIGHT = ROWS * (CELL_SIZE + GAP_SIZE);
export const INITIAL_DIRECTION = {x: 1, y: 0 };
export const SNAKE_LENGTH = 20;
export const POINTS_PER_APPLE = 2;
export const SPEED = 100;
export const APPLES_COUNT = 5;

export const createCanvasElement = () => {
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    return canvas;
}

export interface Point2D {
    x: number;
    y: number;
}

export interface Directions {
    [key: number]: Point2D;
}

export const DIRECTIONS: Directions = {
    37: {x: -1, y: 0 },
    39: {x: 1, y: 0 },
    38: {x: 0, y: -1 },
    40: {x: 0, y: 1 }
}

export const nextPosition = (prev: Point2D, next: Point2D) => {
    let isOpposite =  (previous: Point2D, next: Point2D) => {
        return next.x === previous.x * -1 || next.y === previous.y * -1;
    };

    if (isOpposite(prev, next)) {
        return prev;
    }
    
    return next;
}

export function generateSnake() {
    let snake: Array<Point2D> = [];
  
    for (let i = SNAKE_LENGTH - 1; i >= 0; i--) {
      snake.push({ x: i, y: 0 });
    }
  
    return snake;
}

export const snakeDraw = (ctx: CanvasRenderingContext2D, snake: Point2D[]) => {
    snake.forEach((point: Point2D, index: number) => {
        ctx.beginPath();
        ctx.rect(point.x * CELL_SIZE, (point.y) * CELL_SIZE , CELL_SIZE, CELL_SIZE);
        ctx.stroke();
    })
}


export const applesDraw = (ctx: CanvasRenderingContext2D, apples: Point2D[]) => {
    apples.forEach((point: Point2D, index: number) => {
        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(point.x * CELL_SIZE, (point.y) * CELL_SIZE , CELL_SIZE, CELL_SIZE);
        ctx.stroke();
    })
}

const cleanCanvas = (ctx) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export const move = (snake, [direction, snakeLength]) {
    let nx = snake[0].x;
    let ny = snake[0].y;
  
    nx += 1 * direction.x;
    ny += 1 * direction.y;
  
    let tail;
  
    if (snakeLength > snake.length) {
      tail = { x: nx, y: ny };
    } else {
      tail = snake.pop();
      tail.x = nx;
      tail.y = ny;
    }
  
    snake.unshift(tail);
  
    return snake;
}

export const generateApples = (): Point2D[] => {
    let apples = [];
    for (let i = 0; i < APPLES_COUNT; i++) {
        apples.push(randomPoint())
    }

    return apples
}

export const randomPoint = (): Point2D => {
    return {
        x: Math.round(Math.random()*COLS),
        y: Math.round(Math.random()*ROWS)
    }
}

export const eat = (apples: Point2D[], snake: Point2D[]) => {
    const snakeHead = snake[0];

    apples.forEach((apple: Point2D, index: number) => {
        if (isColliding(apple, snakeHead)) {
            apples.splice(index, 1);

            apples = [...apples, randomPoint()];
        }
    })

    return apples;
}

export const isColliding = (p1: Point2D, p2: Point2D) => p1.x === p2.x && p1.y === p2.y;
export const isGameOver = (scene) => {
    let snake = scene.snake;
    let head = snake[0];
    let body = snake.slice(1, snake.length);

    return body.some(segment => isColliding(segment, head));
}

let canvas = createCanvasElement();
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

let keydown$ = fromEvent(document, 'keydown');
let direction$ = keydown$
                    .pipe(
                        map((event: KeyboardEvent) => DIRECTIONS[event.keyCode]),
                        filter(direction => !!direction),
                        scan(nextPosition),
                        startWith(INITIAL_DIRECTION),
                        distinctUntilChanged()
                    );

let length$ = new BehaviorSubject<number>(SNAKE_LENGTH);
let snakeLength$ = length$
                        .pipe(
                            scan((step, snakeLength) => snakeLength + step),
                            share()
                        )

let score$ = snakeLength$
                    .pipe(
                        startWith(0),
                        scan((score, _) => score + POINTS_PER_APPLE)
                    );

let ticks$ = interval(SPEED);

let snake$ = ticks$
                .pipe(
                    withLatestFrom(direction$, snakeLength$, (_, direction, snakeLength) => [direction, snakeLength]),
                    scan(move, generateSnake()),
                    share()
                )

let apples$ = snake$.pipe(
    scan(eat, generateApples()),
    distinctUntilChanged(),
    share()
);

let applesEaten$ = apples$.pipe(
    skip(1),
    tap(() => length$.next(1))
).subscribe();

let scene$ = combineLatest(snake$, apples$, (snake, apples) => ({snake, apples}));

scene$
    .pipe(
        takeWhile((scene) => !isGameOver(scene))
    )
    .subscribe(data => {
        cleanCanvas(ctx);
        snakeDraw(ctx, data.snake);
        applesDraw(ctx, data.apples);
    });
