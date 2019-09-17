
const memory = {};
    
const intructions = {
    mov: (memory, register, value) => {
        memory[register] = (memory[value]) ? memory[value] : +value;
        return memory;
    },
    inc: (memory, register) => {
        memory[register]++;
        return memory;
    },
    dec: (memory, register) =>{
        memory[register]--;
        return memory;
    },
    jnz: (memory, register, step) => {
        const s = (memory[step]) ? memory[step] : +step;
        return (memory[register] !== 0 && s !== 0) ? s : 1
    }
}

const simple_assembler = (instructions) => {
    let i = 0;
    const end = instructions.length;

    instructions = instructions.map(ins => ins.split(' '));

    do {
        const instruction = instructions[i];
        const result = intructions[instruction[0]](memory, instruction[1], instruction[2]);

        i = (instruction[0] === 'jnz') ? (i + result) : (i + 1);
        // console.log(i)
        console.log(result)
        
    } while(end > i)
    
    return memory;
} 

const p = simple_assembler(['mov a 5','inc a','dec a','dec a','jnz a -1', 'inc a']);

console.log(p);