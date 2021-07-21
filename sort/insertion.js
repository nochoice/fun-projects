const insertSort = (arr) => {
    let i = 1;

    while(i < arr.length) {
        let x = arr[i];
        let j = i - 1;

        while ((j >= 0) && (arr[j] > x)) {
            arr[j+1] = arr[j];
            j--;
        }
        
        arr[j+1] = x;
        i++;
    }
    return arr;
}

module.exports = insertSort;