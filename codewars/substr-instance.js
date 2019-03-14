const searchSubstr = (fullText, searchText, allowOverlap = true) => {
    if (!searchText) return 0;

    const sl = searchText.length;
    const fl = fullText.length;
    let numTimes = 0;

    for (let i=0; i<=(fl-sl); i++) {
        if (searchText === getSubstr(fullText, i, sl)) {
            numTimes++;

            if(!allowOverlap) i += sl;
        };
    }


    return numTimes;
}

const getSubstr = (str, position, length) => str.substring(position, position + length);

console.log(searchSubstr('aa_bb_cc_dd_bb_e', 'bb', true))
console.log(searchSubstr('aaabbbcccc', 'bbb', true))
console.log(searchSubstr('aaa', 'aa', true))
console.log(searchSubstr('aaa', '', true))

console.log(searchSubstr( 'aaa', 'aa', true ));