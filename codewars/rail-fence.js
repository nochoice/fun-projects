const railEncode = 'WEAREDISCOVEREDFLEEATONCE';

const code = (str, num) => {
    const map = [];
    str.split('').map((string, i) => {

        const railNum = rail(num, i);
        const railArr = map[railNum] ? map[railNum] : [];
        
        railArr.push(string);
        map[railNum] = railArr;
    });
    // console.log(map);
    
    return map;
}

const rail = (numOfRails, i) => {
    numOfRails = numOfRails - 1;
    const isUp = !(Math.floor(i/(numOfRails)) % 2);
    const interval = Math.floor(i / (numOfRails));

    // console.log(i       )
    // console.log(interval)
    // console.log(isUp    )

    let y;
    if (isUp) {
        y = i - ((interval)  * (numOfRails));
    } else {
        y = numOfRails + (-i + ((interval) * (numOfRails)));
    }

    return y;
}

const encode = (str, numRails) => {
    return code(str,numRails).map(item => item.join('')).reduce((acc, item) => acc + item, '');
}

const decode = (str, numRails) => {
    let railLenghts = code(str,numRails).map(item => item.length);
    let result = '';

    let prev = 0;
    let a = railLenghts.map((num, index, arr) => {
        const p = (index) ? arr[index - 1] : 0;
        prev += p;
        return str.substring(prev, prev + num)
    }).map(item => item.split(''))

    let direction = 1;
    let position = -1;

    for (let i=0; i<str.length; i++) {
        position += direction;

        if(!a[position]) {
            if (position < 0) position = 1;
            if (position > 0) position -= 1;
            direction *= -1;

            position += direction;
        }

        result += a[position].shift();
    }
    return  result
}

// console.log(encode(railEncode, 3))
console.log(decode('WECRLTEERDSOEEFEAOCAIVDEN', 3))


// const p = [];
// for (let i=0; i<20; i++) {
//     p.push(rail(5, i));
// }

// console.log(p)

// console.log(rail(4, 0));
// console.log(rail(4, 1));
// console.log(rail(4, 2));
// console.log(rail(4, 3));
// console.log(rail(4, 4));
// console.log(rail(4, 5));
// console.log(rail(4, 6));
// console.log(rail(4, 7));
// console.log(code(railEncode));
// console.log(rail(3,0));
// console.log(rail(3,1));
// console.log(rail(3,2));
// console.log(rail(3,3));
// console.log(rail(3,4));
// console.log(rail(3,5));
// console.log(rail(3,6));

// console.log(rail(2,0));
// console.log(rail(2,1));
// console.log(rail(2,2));
// console.log(rail(2,3));

// console.log(rail(4,0));
// console.log(rail(4,1));
// console.log(rail(4,2));
// console.log(rail(4,3));
// console.log(rail(4,4));
// console.log(rail(4,5));
// console.log(rail(4,6));
// console.log(rail(4,7));
// console.log(rail(4,8));
// console.log(rail(4,9));
// console.log(rail(4,10));
