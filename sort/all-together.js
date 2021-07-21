const data = require('./data/list.json');

const sortSelect = require('./selection');
const sortMerge = require('./merge');
const sortInsert = require('./insertion');

const sorts = [
    {title: 'JS native  sort', alg: (items) => items.sort()}, 
    {title: 'Merge sort', alg: sortMerge}, 
    {title: 'Insert sort', alg: sortInsert}, 
    {title: 'Select sort', alg: sortSelect}
];

// console.log(sortMerge);
sorts.forEach((sort) => {
    console.log(sort.title);
    console.time();
    sort.alg(data);
    console.timeEnd();
});