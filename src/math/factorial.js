'use strict';

var factorialCache = {};
factorialCache[0] = 1;
factorialCache[1] = 1;
/**
 * Calculate factorial of a number
 * @param {Number} n The factor
 * @return {Number} The computed factorial
 */
function factorial(n) {
    if (n < 0) {
        throw 'Negative factorials not supported';
    }
    if (factorialCache[n]) {
        return factorialCache[n];
    }
    var prevFact = factorialCache[n - 1] || factorial(n - 1);
    factorialCache[n] = n * prevFact;
    return factorialCache[n];
}

export { factorial };
