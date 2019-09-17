const rle = '7 15 4 100 15 25 2 175 2 25 5 175 2 25 5';

const decompress = (rle) => {
    const width = getWidth(rle);
    const rest = getRle(rle);

    return rest.filter((_, i) => i % 2)
        .map((_, i) => getTuple(rest, i))
        .reduce((acc, tupple) => {
            for(let g=0; g<tupple.repeat; g++) {
                const row = Math.floor(acc.itt / width);
                const col = acc.itt % width;

                if (!acc.matrix[row]) acc.matrix[row] = [];

                acc.matrix[row][col] = tupple.obj;
                acc.itt++;
            }

            return acc;
        }, {matrix: [], itt: 0})
        .matrix;
}

const getTuple = (rle, position) => ({obj: rle[position * 2], repeat: rle[(position * 2) + 1]})

const getWidth = (rle) => +rle.split(' ')[0];
const getRle = (rle) => rle.split(' ').splice(1);


console.log(decompress(rle));