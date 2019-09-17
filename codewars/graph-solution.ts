var arcs = [
    { start: "a", end: "b"},
    { start: "b", end: "c"},
    { start: "c", end: "a"},
    { start: "c", end: "d"},
    { start: "e", end: "a"}
];
    
const solve_graph = (start, end, arcs) => {
    if(start === end) return true;

    const visited = [];
    let hasEndMain = false;

    const traverse = (start, end, arcs) => {
        const hasEnd = !!arcs.filter((item) => item.start === start && item.end === end)[0];

        if(hasEnd) {
            hasEndMain = true;
            return hasEnd;
        } else {
            const s = arcs.filter((item) => item.start === start);

            visited.push(start);
            
            s.forEach(element => {
                if (!visited.includes(element.end)) traverse(element.end, end, arcs);
            });
            return false
        }
    }
    
    traverse(start, end, arcs);

    return hasEndMain;
}

console.log(solve_graph("a", "e", arcs));