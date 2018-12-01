import {fillArray} from '../lib/utils/fill-array';

const months = {
    1: (year) => 31,
    2: (year) => {
        if ((year % 100 === 0) && (year % 400 === 0)) return 29;
        if ((year % 100 === 0) && (year % 400 !== 0)) return 28;
        if (year % 4 === 0) return 29;
        if (year % 4 !== 0) return 28;
    },
    3: (year) => 31,
    4: (year) => 30,
    5: (year) => 31,
    6: (year) => 30,
    7: (year) => 31,
    8: (year) => 31,
    9: (year) => 30,
    10: (year) => 31,
    11: (year) => 30,
    12: (year) => 31
};

const daysInYear = (year) => Object.keys(months).reduce((acc, key) => acc.concat(fillArray(months[key](year))) , []);
const getFirstDayInNextYear = (pastYearDays, startPastDay) => (pastYearDays.length + startPastDay) % 7;
const countSundays = (daysInYear, startDay) => daysInYear.filter((item, i) => (i - startDay) % 7 === 0).filter(item => item === 1).length;

let firstDay= getFirstDayInNextYear(daysInYear(1900), 0);

let sundays = 0;
for (let i = 1901; i <= 2000; i++) {
    const daysInY = daysInYear(i);
    sundays += countSundays(daysInY, firstDay);
    firstDay = getFirstDayInNextYear(daysInY, firstDay);
}

console.log(sundays);

