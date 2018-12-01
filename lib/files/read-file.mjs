import fs from 'fs';
import util from 'util';

const readFileAsync = util.promisify(fs.readFile);

export const readFile = (path) => fs.readFileSync(path, 'utf8');