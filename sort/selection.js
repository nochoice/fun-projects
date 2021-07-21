const selectSort = (arr) => {
    let i = 0;
    while(i < arr.length) {
        let j = i+1;
        let minPos = i;

        while ((j < arr.length)) {
            if(arr[minPos] < arr[j]) {
                minPos = j;
            }
            j++;
        }

        let first = arr[i];
        arr[i] = arr[minPos];
        arr[minPos] = first;
        
        i++;
    }
    return arr;
}

module.exports = selectSort;


