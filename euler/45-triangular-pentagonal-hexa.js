const getTriangle = (n) => (n* (n + 1))/2;
const getPenta = (n) => (n*(3*n - 1))/2;
const getHexa = (n) => (n*(2*n - 1));

const is = (num, down, func) => {

    let result = 0;
    let till = down / 4
    
    while(down > till) {
        result = func(down);
        if (result === num) {
            return down;
        }
        down--;
    }

    return false;
}

const start = () => {
    let triangle = 50000;
    let t;

    do {
        triangle++;
        t = getTriangle(triangle);

    } while (!(is(t, triangle, getPenta) && is(t, triangle, getHexa)));

    console.log(getTriangle(triangle));
}

start();
