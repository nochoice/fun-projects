export const splitLine = (str, separator) => str.split(separator);
export const splitLineToNum = (str, separator) => splitLine(str, separator).map(i => +i);