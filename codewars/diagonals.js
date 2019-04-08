const data = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ];

const WIN1 = "Principal Diagonal win!";
const WIN2 = "Secondary Diagonal win!";
const DRAW = "Draw!";

const getDiagonals = (matrix) => {
    return matrix.reduce((acc, item, i) => {
        acc.d1.push(item[i]);
        acc.d2.push(item[item.length - i -1]);
        return acc;
    }, {d1: [], d2: []});
};

const result = (arr1, arr2) => {
    const l1 = arr1.reduce((acc, i) => acc + i, 0);
    const l2 = arr2.reduce((acc, i) => acc + i, 0);

    if (l1 === l2) { return DRAW; }
    if (l1 > l2) { return WIN1; }
    if (l1 < l2) { return WIN2; }
};

const diagonal = (matrix) => {
    const diags = getDiagonals(matrix);

    return result(diags.d1, diags.d2);
};

diagonal(data);




