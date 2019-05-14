const input = `CLOSED: APP_PASSIVE_OPEN -> LISTEN
CLOSED: APP_ACTIVE_OPEN  -> SYN_SENT
LISTEN: RCV_SYN          -> SYN_RCVD
LISTEN: APP_SEND         -> SYN_SENT
LISTEN: APP_CLOSE        -> CLOSED
SYN_RCVD: APP_CLOSE      -> FIN_WAIT_1
SYN_RCVD: RCV_ACK        -> ESTABLISHED
SYN_SENT: RCV_SYN        -> SYN_RCVD
SYN_SENT: RCV_SYN_ACK    -> ESTABLISHED
SYN_SENT: APP_CLOSE      -> CLOSED
ESTABLISHED: APP_CLOSE   -> FIN_WAIT_1
ESTABLISHED: RCV_FIN     -> CLOSE_WAIT
FIN_WAIT_1: RCV_FIN      -> CLOSING
FIN_WAIT_1: RCV_FIN_ACK  -> TIME_WAIT
FIN_WAIT_1: RCV_ACK      -> FIN_WAIT_2
CLOSING: RCV_ACK         -> TIME_WAIT
FIN_WAIT_2: RCV_FIN      -> TIME_WAIT
TIME_WAIT: APP_TIMEOUT   -> CLOSED
CLOSE_WAIT: APP_CLOSE    -> LAST_ACK
LAST_ACK: RCV_ACK        -> CLOSED`;

const eventList = ["APP_ACTIVE_OPEN","RCV_SYN_ACK","RCV_FIN","APP_CLOSE"];

const regex = /(\w*): (\w*)\s*-> (\w*)/;

const transitions = input
                    .split('\n')
                    .map(item => item.match(regex))
                    .map(item => ({in: item[1], symbol: item[2], out: item[3]}))

const traverseTCPStates = (eventList) => {
    let state = "CLOSED";  

    eventList.forEach(symbol => {
        state = transitionFunc(state, symbol)
    });

    return state || 'ERROR';
}

const createTransitionFunction = (transitions) => 
                            (state, symbol) => {
                                const tansitions = transitions.filter(transition => transition.in === state && transition.symbol === symbol);
                                return (tansitions.length) ? tansitions[0].out : false;
                            }

const transitionFunc = createTransitionFunction(transitions);

// console.log(traverseTCPStates(eventList))

const forReduce = input.split('\n')
    .map(item => item.match(regex))
    .map(item => ({in: item[1], symbol: item[2], out: item[3]}))
    .reduce((acc, item) => {
        acc[item.in] = acc[item.in] || {};
        acc[item.in][item.symbol] = item.out;

        return acc; 
    }, {})

console.log(forReduce);
