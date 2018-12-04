import {splitLine} from '../../lib/utils/array/split-line';
import {readFile} from '../../lib/files/read-file';

const data = splitLine(readFile(`advent/2018/data/02-1`), '\r\n');

const mapOfSameChars = (data) => {
    return data.split('').reduce((acc, i) => {
        if(!acc.has(i)) acc.set(i, 1);
        else acc.set(i, acc.get(i) +1);

        return acc;
    }, new Map())
};

const filterMapOfSameChars = (map) => {
    const values = Array.from(map.values());
    const twos = values.includes(2) ? 1 : 0;
    const threes = values.includes(3) ? 1 : 0;

    return [twos, threes];
};

const checkSum = (data) => {
    const agr = data.reduce((acc, line) => {
        const d = filterMapOfSameChars(mapOfSameChars(line));

        acc[0] += d[0];
        acc[1] += d[1];

        return acc;
    }, [0,0]);

    return agr[0] * agr[1];
};

// ==========================================================================================

const getSimiliar = (data) => {
    const result = [];
    data.forEach((item, position) => {
        data.forEach((insideItem) => {
            if (compareSimiliar(item, insideItem) === 1) {
                if (!result.includes(item)) {
                    result.push(item);
                    result.push(insideItem);
                }

            }
        })
    });

    return result;
};

const compareSimiliar = (str1, str2) => {
    const s1 = str1.split('');
    const s2 = str2.split('');

    return s1.reduce((acc, char, position) => {
        if (char === s2[position]) {
            acc--;
        }
        return acc;
    } , s1.length)
};

const removeNotSame = (arr) => {
    const s1 = arr[0].split('');
    const s2 = arr[1].split('');

    let result = '';

    s1.forEach((char, position) => {
        if (char === s2[position]) {
            result += char;
        }
    });

    return result;
}

console.log(removeNotSame(getSimiliar(data)));






