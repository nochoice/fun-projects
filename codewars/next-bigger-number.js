const nextBiggerNumber = (num) => {
    const nums = (''+num).split('').reverse();
    console.log(nums);

    const position = nums.findIndex((currentValue, currentIndex, array) => (array[currentIndex] > array[currentIndex+1])) + 1;
    const suffix = nums.splice(0, position);

    console.log(suffix);
    const suffixMin = Math.min(...suffix)

    return suffixMin
}


console.log(nextBiggerNumber(20173220));