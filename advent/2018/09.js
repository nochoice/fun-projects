const setup = (players, lastMarble) => {
    let currentPlayer;
    let playersObj = {};
    let circle = {
        data: [],
        current: 0,
        removedNum: 0
    };

    for(let i=0; i<=lastMarble; i++) {
        currentPlayer = i % players;

        if ((i > 0) && (i % 23 === 0)) {
            circle = differened(circle);
            if (!playersObj[currentPlayer]) playersObj[currentPlayer] = 0;
            playersObj[currentPlayer] += circle.removedNum + i;
        } else {
            circle = addC(circle, i);
        }
    }

    return Math.max(...Object.values(playersObj));
};

const differened = (circle) => {
    const circleLength = circle.data.length;
    const positionToRemove = positionInCircle(circleLength, circle.current, -7); // (circle.current - 7) % circleLength;

    const removedNum = circle.data.splice(positionToRemove, 1)[0];
    circle.current = positionToRemove;

    return {
        data: [...circle.data],
        current: circle.current,
        removedNum
    };
};

const addC = (circle, marble) => {
    const circleLength = circle.data.length;

    circle.data.splice((circle.current +1) % circleLength + 1, 0, marble);
    circle.current = circle.data.indexOf(marble);

    return {
        data: [...circle.data],
        current: circle.current
    };
};


const positionInCircle = (listLength, actual, diff) => {
    if (actual + diff >= 0 && (actual + diff < listLength)) {
        return actual + diff;
    } 

    if (actual + diff < 0) {
        return listLength + (actual  + diff);
    }

    if (actual + diff > listLength) {
        return (actual + diff) % listLength;
    }
};

// 425 players; last marble is worth 70848 points
console.log(setup(10, 500));

// 425 players; last marble is worth 7084800 points
// second star it burns. 