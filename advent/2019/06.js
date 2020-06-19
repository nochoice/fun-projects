const generateTree = (data, start = 'COM') => {
    const parsed = parseData(data);
    const tree = buildNode(start);

    const treeBuild = (node) => {
        parsed.forEach(n => {
            if(n.start ===  node.name) {
                const newNode = buildNode(n.end);
                node.children.push(newNode);
                treeBuild(newNode);
            }
        });
    }

    treeBuild(tree);

    return tree
}

const countSumDirectIndirect = (data, traverseWith = countSum()) => {
    const tree = generateTree(data);
    
    const travers = (node, level) => {
        traverseWith.func(node, level);
        node.children.forEach((n => travers(n, level+1)));
    }

    travers(tree, 0);

    return traverseWith.result();
}

const countSum = () => {
    let direct = 0;
    let indirect = 0;

    return {
        result: () => direct + indirect,
        func: (node, level) => {
            if (level > 0) {
                direct++;
                indirect += level - 1;
            }
        }
    }
}

const buildNode = (data) => {
    return {
        name: data,
        children: []
    };
}

const parseData = (data) => {
    return data
        .split('\n')
        .map((line) => ({start: line.split(')')[0].trim(), end: line.split(')')[1].trim()}))
}

exports.generateTree = generateTree;
exports.parseData = parseData;
exports.buildNode = buildNode;
exports.countSumDirectIndirect = countSumDirectIndirect;