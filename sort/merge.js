const mergeSort = (arr) => {
    let middle = Math.floor(arr.length /2);

    if(middle <= 0) return arr;

    let left = mergeSort(arr.filter((_, i) => i<middle));
    let right = mergeSort(arr.filter((_, i) => i >= middle));

    return merge(left, right);
}

const merge = (left, right) => {
    let i = 0, j = 0;
    let out = [];

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            out.push(left[i]);
            i++;
        } else {
            out.push(right[j]);
            j++;
        }
    }

    while (i < left.length) {
        out.push(left[i]);
        i++;
    }

    while (j < right.length) {
        out.push(right[j]);
        j++;
    }

    return out;
}


module.exports = mergeSort;