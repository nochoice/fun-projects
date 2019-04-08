const data = 'nquwuv spgh fd';
const SEP_BLANK = ' ';
const SEP_BORDER = '*';

const getMirroredLines = (text) => text.split(' ').map(line => line.split('').reverse().join(''));
const getMaxLength = (lines) => Math.max(...lines.map(line => line.length));
const paddString = (line, length) => SEP_BLANK + line.padEnd(length, SEP_BLANK);

const borderFull = (size) => new Array(size).fill(size).map(i => SEP_BORDER).join('');
const borderSide = (line) => SEP_BORDER + line + SEP_BORDER;

const mirror = (data) => {
    const lines = getMirroredLines(data);
    const maxLength = getMaxLength(lines);

    const padded = lines.map((line) => paddString(line, maxLength + 1));

    padded.unshift(borderFull(maxLength + 2));
    padded.push(borderFull(maxLength + 2));

    return padded.map(borderSide).join('\n');
};

console.log(mirror(data));

