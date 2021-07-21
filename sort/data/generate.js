const fs = require('fs');

const arr = new Array(1000).fill(0).map((i) => Math.floor(Math.random() * 200000000));

fs.writeFileSync('./data/list.json', JSON.stringify(arr));