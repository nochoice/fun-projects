import {readFile} from '../../lib/files/read-file';
import {splitLine} from '../../lib/utils/array/split-line';

const data = splitLine(readFile(`advent/2018/data/04-1`), '\r\n');


const prepareEvents = (data) => {
    return data.map(event => {
        let type;
        let guardId = null;
        const r = /\[(.*)\] (.*)/;
        const rGuard = /Guard #(\d*)/;

        let [, date, text] = event.match(r);
        const isGuard = text.includes('Guard');
        const isAsleep = text.includes('falls asleep');
        const isWakesUp = text.includes('wakes up');

        if (isGuard) {
            type = 0;
            guardId = text.match(rGuard)[1];
        }
        if (isAsleep) {type = 1}
        if (isWakesUp) {type = 2}

        date = new Date(date);

        return { type, guardId, date};
    })
};

const sortEvents = (events) => [...events].sort((a, b) => (a.date.getTime() >= b.date.getTime()) ? 1 : -1);

const groupGuards = (events) => {
    const guardsGrouped = {};
    let actualGuard;
    let position = 0;

    while(position < events.length) {
        let event = events[position];

        if (event.type === 0) {
            actualGuard = event.guardId;
            guardsGrouped[actualGuard] = guardsGrouped[actualGuard] || [];
        } else {
            guardsGrouped[actualGuard].push(event);
        }
        position++;
    }

    return guardsGrouped;
};


const events = sortEvents(prepareEvents(data));
const groups = groupGuards(events);

const timeDiference = (start, end) => end.getMinutes() - start.getMinutes();
const minutesArray = (start, end) => {
    const minutes = [];
    for (let i = start.getMinutes(); i < end.getMinutes(); i++) {
        minutes.push(i);
    }

    return minutes;
}


const sleepMinutesIntervals = (group) => {
    const guardsIds = Object.keys(group);

    return guardsIds.reduce((acc, id) => {
        const guard = group[id];
        let diff = [];

        for (let i = 0; i < guard.length; i += 2) {
            diff.push(minutesArray(guard[i].date, guard[i+1].date));
                    }
        // acc[id] = Math.max.apply(null, diff);
        acc[id] = diff;

        return acc
    }, {})
};

const getMaxOccurence = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
        if (obj[key] >= acc.max) {
            acc.max = obj[key];
            acc.key = key;
        }

        return acc;
    }, {max: 0})
};

const getMaxOccurenceArray = (arr) => {
    return arr.reduce((acc, val) => {
        acc[val] = acc[val] || 0;
        acc[val] ++;

        return acc;
    }, {})
};

const occurenceOf = (arr, item) => arr.filter(i => i === item).length;

const guardsSleepIntervals = sleepMinutesIntervals(groups);
// console.log(guardsSleepIntervals);

const result1 = (guardsSleepIntervals) => {
    // console.log(guardsSleepIntervals);

    const guardsIds = Object.keys(guardsSleepIntervals);

    const concatedTimes = guardsIds.reduce((acc, id) => {
        const guard = guardsSleepIntervals[id];
        let concat = [];

        for (let i = 0; i < guard.length; i++) {
            concat = concat.concat(guard[i]);
        }
        acc[id] = concat;

        return acc
    }, {});

    const o = guardsIds.reduce((acc, id) => {
        if (concatedTimes[id].length > acc.size)  {
            acc.size = concatedTimes[id].length;
            acc.minutes = concatedTimes[id];
            acc.guardId = id;
        }
        return acc;
    }, {size: 0});

    const u =  o.minutes.reduce((acc, minute) => {
        acc[minute] = acc[minute] || 0;
        acc[minute]++;

        return acc;
    }, {});

    return (+o.guardId) * (+getMaxOccurence(u).key);

};

const result2 = (guardsSleepIntervals) => {
    // console.log(guardsSleepIntervals);

    const guardsIds = Object.keys(guardsSleepIntervals);

    const concatedTimes = guardsIds.reduce((acc, id) => {
        const guard = guardsSleepIntervals[id];
        let concat = [];

        for (let i = 0; i < guard.length; i++) {
            concat = concat.concat(guard[i]);
        }
        return acc.concat(concat);
    }, []);

    const concatedGuardsTimes = guardsIds.reduce((acc, id) => {
        const guard = guardsSleepIntervals[id];
        let concat = [];

        for (let i = 0; i < guard.length; i++) {
            concat = concat.concat(guard[i]);
        }
        acc[id] = occurenceOf(concat, 45);

        return acc
    }, {});

    console.log(getMaxOccurence(concatedGuardsTimes));
    console.log(getMaxOccurence(getMaxOccurenceArray(concatedTimes)));

    return +getMaxOccurence(concatedGuardsTimes).key * +getMaxOccurence(getMaxOccurenceArray(concatedTimes)).key
}




console.log(result2(guardsSleepIntervals));



// console.log(guardsSleepIntervals);



