import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
import { tap, scan, flatMap, distinctUntilChanged, toArray, take, reduce, filter, map, startWith, withLatestFrom } from 'rxjs/operators';
import { of, interval, merge, timer, combineLatest, BehaviorSubject, fromEvent } from 'rxjs';


import * as canvas from './js/canvas';

const c = canvas.createCanvas(900, 400);
canvas.appendCanvas(document.body, c);
const ctx = canvas.getCtx(c);

const DIRECTIONS: {[key: number]: number} = {
    37: -1,
    39: 1
}

const keyPress$ = merge(
    fromEvent(document, 'keydown')
    .pipe(
        map((e: KeyboardEvent) => DIRECTIONS[e.keyCode]),
        filter((dir: number) => !!dir)
    ),
    fromEvent(document, 'keyup').pipe(map(() => 0))
).pipe(
    distinctUntilChanged()
);

interface Paddle {
    x: number;
    speed: number;
    size: number
}
const PADDLE_INIT: Paddle = {
    x: 50,
    speed: 2,
    size: 100
}

// setTimeout(() => {paddleSpeed$.next(0.1)}, 2000)
// setTimeout(() => {paddleSpeed$.next(10)}, 5000)

const ticker$ = interval(0, animationFrame)
    // .pipe(take(10)); 

const paddleSpeed$ = new BehaviorSubject<number>(1);
const paddleSize$ = new BehaviorSubject<number>(100);

const paddleMove$ = ticker$.pipe(
    withLatestFrom(keyPress$, paddleSpeed$, paddleSize$),
    scan((paddle: Paddle, [_, direction, speed, size]) => {
        paddle.speed = speed;
        paddle.size = size;
        paddle.x += (<number>direction * speed);

        if (paddle.x <= 0) paddle.x = 0;
        if (paddle.x >= 100) paddle.x = 100;

        return paddle;
    }, PADDLE_INIT),
 
)


interface Ball {
    x: number;
    y: number;
    diffX: number;
    diffY: number;
    size: number;
}

const BALL_INIT: Ball = {
    x: 50, 
    y: 100,
    diffX: -1,
    diffY: -1,
    size: 5
}



const ballMove$ = ticker$.pipe(
    scan((ball: any, a: any) => {
        ball = ballCollisionBorder(ball);
        ball.x += ball.diffX;
        ball.y += ball.diffY;

        return ball
    }, BALL_INIT)
)

const ballCollisionBorder = (ball: Ball): Ball => {
    if (ball.x <= 0) ball.diffX = 1;
    if (ball.x >= 100) ball.diffX = -1;

    if (ball.y <= 0) ball.diffY = 1;
    if (ball.y >= 100) ball.diffY = -1;

    return ball;
}  

const draw = (ball: Ball, paddle: Paddle): void => {
    cleanCanvas(ctx);
    drawBall(ball);
    drawPaddle(paddle);
}

const cleanCanvas = (ctx) => {
    ctx.clearRect(0, 0, c.width, c.height);
}

const drawBall = (ball: Ball) => {
    ctx.beginPath();
    ctx.arc((ball.x/100) * c.width, (ball.y/100) * c.height, (ball.size)*2, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
}

const drawPaddle = (paddle: Paddle): void => {
    ctx.beginPath();
    const posX = (paddle.x / 100) * c.width; 
    
    ctx.fillRect(posX - (paddle.size / 2) , 50, paddle.size, 15)
    ctx.fillStyle = 'green';
}

combineLatest(ticker$, paddleMove$, ballMove$)
    .pipe(
        tap(([_, paddle, ball]) => {
            draw(ball, paddle);
        })
    )
.subscribe();

// ticker$.pipe(
//     withLatestFrom(keyPress$),
//     tap((a: any) => console.log(a))
// ).subscribe();

