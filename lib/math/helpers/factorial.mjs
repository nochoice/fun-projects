export const factorial = (num) => (num === 1 || num === 0) ? 1 : num * factorial(num - 1);
