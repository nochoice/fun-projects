const input = 'Mellow Yellow';

const encode = (data) => {
    if (!data) return ['', 0];

    const arr = data.split('');

    const matrix = arr.map((char, i) =>  cycle(arr, i).join('')).sort();
    const last = lastCol(matrix).join('');

    return [last, matrix.indexOf(data)];
};

const decode = (data, position) => {
    if (!data) return '';

    const matrix = [];
    const lastRow = data.split('');

    lastRow.forEach((a, y) => {
        lastRow.forEach((b, x) => {
            if(!matrix[x]) matrix[x] = '';

            matrix[x] = b + matrix[x];
        });

        matrix.sort();
    });

    return matrix[position];
};

//--------------------------- Helpers

const cycle = (arr, position) => {
    const h = [];
    const l = arr.length;

    for (let i = 0; i < l; i++) {
        h.push(arr[(i + position) % l]);
    }

    return h;
};

const lastCol = (matrix) => matrix.map(row => row.split('').pop());

