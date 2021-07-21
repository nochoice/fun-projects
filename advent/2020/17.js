// const fs = require('fs');

// const data = fs.readFileSync('./2020/data/16.txt', {encoding:'utf8', flag:'r'});
const BEGIN_RATE = 0.8;
const CYCLES = 600;
const SPEED = 600;
const BOARD_SIZE = [80, 100];
const SELECTED_STRATEGY = 'basic';

const sleep = (ms) =>  new Promise(resolve => setTimeout(resolve, ms));

const conditionBasic = (board, x, y) => {
    const isAlive = isCellAlive(board, x, y);
    const n = neighbours(board, x, y).filter(ne => !!ne).length;

    if (!isAlive && n === 3) { return 1;} 
    else if (isAlive && (n === 2 || n === 3) ){ return 1; }
    return 0;
}

const conditionUltra = (board, x, y) => {
    const isAlive = isCellAlive(board, x, y);
    const n = neighbours(board, x, y).filter(ne => !!ne).length;

    if (!isAlive && n === 3) { return 1;} 
    else if (isAlive && ( n === 4 || n === 5) ){ return 1; }
    return 0;
}

const strategy = {
    basic: conditionBasic,
    ultra: conditionUltra,
}

const boardGenerate = (w = 20, h = 20) => new Array(h).fill(0).map(i => new Array(w).fill(0));
const boardRandomFill = (board) =>board.map(l => l.map(p => (Math.random() > BEGIN_RATE) ? 1 : 0));
const boardNewGenearation = (board, condition) => board.map((l, y) => l.map((p, x) => condition(board, x, y)));
const boardRender = (board) => board.map(l => l.map(c => c ? '#' : ' ').join(' ')).join('\n');

const neighbours = (board, x, y) => {
    const n = [];

    for(let j = y-1; j <= y+1; j++) {
        for(let i = x-1; i <= x+1; i++) {
            if (i === x && j === y) { continue } 
            n.push((board[j]) && (!!board[j][i]))
        }
    }
    return n;
}

const isCellAlive = (board, x, y) =>  board[y][x] === 1;

const gameOfLife = async() => {
    console.clear();
    let b = boardRandomFill(boardGenerate(BOARD_SIZE[1], BOARD_SIZE[0]));

    for(let i=0; i < CYCLES; i++) {
        const o = boardNewGenearation(b, strategy[SELECTED_STRATEGY]);
        console.log('Generace:', i + 1);
        console.log(boardRender(o));

        await sleep(SPEED);
        console.clear();

        b = o;
    }
}

gameOfLife()
module.exports = {}
