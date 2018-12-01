import {factorial} from '../helpers/factorial';

export const binomialCoeficient = (n, k) => (factorial(n))/(factorial(k) * factorial(n-k));