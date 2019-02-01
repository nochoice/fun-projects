const transpose = (amount, tabs) => {
    const strings = tabs.map(string => string.split('').join(''));

    // console.log(strings);

    return getFrets(tabs);
};

getFrets = (tabs) => {
    return tabs.map(string => string.split('|'));
};

transposeStringFret = (amout, string) => {
    return string.split('-');
};


module.exports = {
    transpose,
    transposeStringFret
};
