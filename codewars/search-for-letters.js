const searchForLetters = (string) => {
    return string
            .toLowerCase()
            .split('')
            .reduce((acc, char) => {
                acc[char.charCodeAt(0)] = true;
                return acc
            }, new Array(123).fill(0))
            .slice(97, 123)
            .map(a => a ? 1 : 0)
            .join('');
}

