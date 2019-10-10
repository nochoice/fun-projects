const getW = (height) => {
    if (height < 2) return [];

    const w = Array(height).fill(0);

    return w.map((item, itt) => {
        const w = height * 4-3;
        const line = Array(w).fill(' ');

        line[itt] = '*';
        line[w - itt - 1] = '*';
        line[(2 * height - 2) - itt] = '*';
        line[Math.floor(w/2) + itt] = '*';

        return line.join('');
    });
}

console.log(getW(3));

