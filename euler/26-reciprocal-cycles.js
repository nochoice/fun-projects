
const reciprocal = (i) => {
    let itteration = 0;
    let reminders = [];
    let num = 1;

    do {

        let quotient = Math.floor(num/i);
        let remainder = num % i;

        if (quotient === 0) {
            num *= 10;
            reminders.push(remainder) 
        }
        itteration++;
        console.log(num);

    } while (itteration < 10) 


    console.log(reminders)
    return 1/i;
}


const range = new Array(2)
                        .fill(0)
                        .map((_, i) => i + 2)
                        .map(reciprocal);

console.log(range);


