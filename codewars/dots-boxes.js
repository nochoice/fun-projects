let moves = [[5,6],[12,17],[16,21],[13,14],[2,7],[5,10],[13,18],[17,18],[10,11],[15,20],[21,22],[1,6],[7,8],[10,15],[15,16],[8,3],[18,23],[0,5],[6,7],[8,13],[11,12],[11,16],[22,23],[17,22],[20,21],[6,11],[16,17],[0,1],[7,12],[12,13],[2,3],[14,19],[23,24],[1,2],[8,9],[19,24],[18,19],[9,14],[4,9],[3,4]];

const dotsAndBoxes = (moves) => {
    const boxes = boxesGenerate(maxSize(moves));
    let playerCounter = 0;

    const playerMoves = moves.reduce((itt, move, positionInGame) => {
        const player = playerCounter % 2;
        
        const l = boxes.map((box, index) => {
            if (lineDraw(box.dots, move)) {
                return {move: move.join('-'), player: player}
            }
        });

        l.forEach((p, itteration) => {
            if (p) {
                if (!itt[itteration]) itt[itteration] = [];
                
                itt[itteration].push(p);

                if (itt[itteration].length === 4) {
                    playerCounter++;
                }
            }
        });

        playerCounter++;

        return itt;
    }, []);

    console.log(.)

    const k = playerMoves.reduce((acc, boxState) => {
        const last = boxState.pop();
        acc.push(last.player);

        return acc
    }, []);


    const r = k.reduce((acc, i) => {
        acc[i]++;
        return acc;
    }, {0: 0, 1: 0});


    return [r[0], r[1]];
}

const lineDraw = (boxDots, line) => {
    return boxDots.includes(line[0]) && boxDots.includes(line[1])
}


const boxesGenerate = (size) => {
    const boxes = [];
    const numOfBoxes = Math.pow(Math.sqrt(size + 1) - 1, 2);
    const w = Math.sqrt(numOfBoxes);
    const h = Math.sqrt(numOfBoxes);

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const b = box();
            const f = (y * (w + 1));

            b.dots.push(x + f);
            b.dots.push(x + f + 1);
            b.dots.push(x + f + w + 1);
            b.dots.push(x + f + w + 2);

            boxes.push(b);
        }
    }

    return boxes;
}

const box = () => ({dots: []});

const maxSize = (moves) => moves.reduce((itt, move) => {
    const max = Math.max(...move);
    return itt > max ? itt : max;
}, 0);


console.log(dotsAndBoxes(moves))