input = `319
680
180
690
129
620
762
689
762
318
368
710
720
710
629
168
160
689
716
731
736
729
316
729
729
710
769
290
719
680
318
389
162
289
162
718
729
319
790
680
890
362
319
760
316
729
380
319
728
716`;

const edge = (start, end) => ({start, end});

const generateEdges = (input) => {
    const passcodes = input.split('\n');

    const p = passcodes
                .map((passcode) => passcode
                                    .split('')
                                    .map((code, position) => edge(code, passcode[position + 1]))
                )
                .reduce((acc, item) => [...acc, ...item], [])
                .filter(item => item.end);

    return p;
}


const createGraph = (edges) => {
    const g = edges.reduce((acc, edge) => {
        if (!acc.has(edge.start)) {
            acc.set(edge.start, new Set(edge.end))
        } else {
                const children = acc.get(edge.start);
                children.add(edge.end);
                acc.set(edge.start, children);
        }

        return acc;
    }, new Map());

    return g;
}

const getStartNodes = (graph) => {
    const k = new Set(graph.keys());
    const allChildren = Array.from(graph.values()).reduce((acc, set) => {
        Array.from(set.values()).forEach(item => acc.add(item));

        return acc;
    }, new Set());

    let difference = new Set(k)
    for (let ch of allChildren) {
        difference.delete(ch)
    }

    return difference
}

const edges = generateEdges(input);
const graph = createGraph(edges);


/**
Kahn's algorithm
--------------------

L ← Empty list that will contain the sorted elements
S ← Set of all nodes with no incoming edge

while S is not empty do
    remove a node n from S
    add n to L
    for each node m with an edge e from n to m do
        remove edge e from the graph
        if m has no other incoming edges then
            insert m into S

if graph has edges then
    return error   (graph has at least one cycle)
else 
    return L   (a topologically sorted order)

*/

const hasIncommming = (node, graph) => Array.from(graph.values()).some((set) => set.has(node));


const kahn = (graph) => {
    const sortedList = [];
    const startedNodes = Array.from(getStartNodes(graph));

    while(startedNodes.length > 0) {
        const item = startedNodes.shift();
        sortedList.push(item);

        if (!graph.get(item)) continue;

        graph.get(item).forEach((i) => {
            graph.get(item).delete(i);

            if(!hasIncommming(i, graph)) {
                startedNodes.push(i);
            }
        });
    }

    return sortedList.join('');
}

const result = kahn(graph);
console.log(result);