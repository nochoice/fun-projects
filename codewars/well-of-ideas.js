const series = ['good', 'bad', 'bad', 'bad', 'bad', 'good'];

const well = (series) => {
    const num = series.filter((item) => item === 'good').length;
    let returnString = '';

    if (num === 0) returnString = 'Fail!';
    if (num === 1 || num === 2) returnString = 'Publish!';
    if (num > 2) returnString = 'I smell a series!';
    
    return returnString;
}
