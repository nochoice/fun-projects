const input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'.split(' ').map(i => +i);


const generate = (arr) => {
    const header = [...arr];
    const numOfChildren = header[0];

    const node = {
        header,
        children: [],
        meta: getMeta(header)
    };

    if (numOfChildren > 0) {
        const subHeader = cropHeader(header, node.meta.length);
        const ch = headerChildrens(subHeader, numOfChildren);

        // console.log(ch);
        ch
            .filter(childHeader => childHeader.length > 1)
            .forEach(childHeader => node.children.push(generate(childHeader)));
    }

    return node;
};

const getMeta = (header) => header.slice(header.length - header[1]);
const cropHeader = (header, endCrop) => header.slice(2, header.length - endCrop);

const headerChildrens = (header, numOfChildren) => {
    const n = header.length/numOfChildren;

    return header
                .slice(0,(header.length+n-1)/n|0)
                .map(function(c,i) { return header.slice(n*i,n*i+n); });
};

const getMetas = (tree) => {
    let metas = [];

    const t = (tree) => {
        metas = [...metas, ...tree.meta];

        tree.children.forEach(t);
    };

    t(tree);
    
    return metas;
};
console.log(generate(input).children[1].children);

const p = getMetas(generate(input)).reduce((acc, i) => acc+i, 0);
console.log(p);

console.log(headerChildrens([1,2,3,4,5,6,7],4));