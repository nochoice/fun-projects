const canvas = `/->-\        
|   |  /----\
| /-+--+-\  |
| | |  | v  |
\-+-/  \-+--/
  \------/ `;

// console.log(String.raw(canvas, {}))

const parseCanvas = (canvas) => {
    return String.raw(canvas).split('\n').map(item => String.raw(item).replace(/\\/g, 'pink'));
}; 

console.log(parseCanvas(canvas));

const getCarts = (canvas) => {
    return canvas.split('\n').reduce((acc, row, y) => {
        const p = row.split('').map((item, x) => ({x, y, direction: item})).filter(item => isCart(item.direction));
        return [...acc, ...p];
    }, []);
};

const isCart = (char) => ['>', '<', '^', 'v'].includes(char);

const getPath = (canvas, x, y) => {
    console.log(canvas.split('\n'));
    return canvas.split('\n').map(row => row.split(''))[y][x];
};


module.exports = {
    canvas,
    getCarts,
    isCart,
    getPath
};