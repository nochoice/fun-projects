class BefungeInterpreter {
    constructor() {
        this.direction = 'L';
        this.position = [0, 0];
        this.stack = [];

        this.directions = {
            L: [1, 0], R: [-1, 0], U: [0, -1], D: [0, 1]
        }
    }

    interpret(code) {
        this.memory = code.split('\n').map(line => line.split(''));
        this.out = [];
        let step = 0;

        while(this.getInstruction() !== '@' && step<40) {

            step++;
            const instruction = this.getInstruction();

            switch (instruction) {
                case '>': 
                    this.direction = 'L';
                    break;
                case '<': 
                    this.direction = 'R';
                    break;
                case 'v': 
                    this.direction = 'D';
                    break;
                case '^': 
                    this.direction = 'U';
                    break;
                case '+': {
                    const [b, a] = this.popLast();
                    this.stack.push(a+b);
                    break;
                }
                case '-': {
                    const [b, a] = this.popLast();
                    this.stack.push(b-a);
                    break;
                }
                case '*': {
                    const [b, a] = this.popLast();
                    this.stack.push(a*b);
                    break;
                }
                case '/': {
                    const [b, a] = this.popLast();
                    this.stack.push(Math.floor(b/a));
                    break;
                }

                case '%': { 
                    const [b, a] = this.popLast();
                    this.stack.push(a === 0 ? a : b%a);
                    break;
                }
                case '!': {
                    const a = this.stack.pop();
                    this.stack.push(a === 0 ? 1 : 0);
                    break;
                }

                case '?': {
                    this.direction = 'L' // TODO: Random 
                    break;
                }

                case '_': {
                    const a = this.stack.pop();
                    this.direction = (a === 0) ? 'R' : 'L';
                    break;
                }

                case '|': {
                    const a = this.stack.pop();
                    this.direction = (a === 0) ? 'D' : 'U';
                    break;
                }
                case ':': {
                    const a = this.stack.pop();
                    if (a) {
                        this.stack = [...this.stack, a, a];
                    } else {
                        this.stack = [0]
                    }
                    break;
                }
                
                case '\\': {
                    const a = this.popLast();
                    this.stack = [...this.stack, ...a];
                    break;
                }

                case '$': {
                    this.stack.pop();
                    break;
                }

                case '.': {
                    this.out.push(this.stack.pop());
                    break;
                }

                case ',': {
                    this.out.push(this.stack.pop());
                    break;
                }

                case '#': {
                    this.position = this.changePosition(this.position, this.direction);
                    break;
                }

                case '"': {
                    let instr;

                    do {
                        this.position = this.changePosition(this.position, this.direction);
                        instr = this.getInstruction();

                        this.stack.push(instr);

                    } while (instr !== '"')
                }

                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9': 
                    this.stack.push(+instruction);
                    break;
            }

            this.position = this.changePosition(this.position, this.direction);
        }

        return [...this.out, ...this.stack.reverse()].join('');
    }

    getInstruction() {
        return this.memory[this.position[1]][this.position[0]];
    }

    changePosition(position, direction) {
        const [dx, dy] = this.directions[direction];
        const [x, y] = position;

        return [dx+x, dy+y];
    }

    popLast() {
        return [this.stack.pop(), this.stack.pop()];
    }
}

// const data = ">987v>.v\nv456<  :\n>321 ^ _@";
const data = '>              v\nv  ,,,,,"Hello"<\n>48*,          v\nv,,,,,,"World!"<\n>25*,@';



const interpret = (code) => {
    const b = new BefungeInterpreter();

    const a = b.interpret(code);
    return a;
}

console.log(interpret(data))