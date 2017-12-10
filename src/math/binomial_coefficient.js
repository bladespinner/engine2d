'use strict';

var memory = {};

/**
 * Calculate binomial coefficient
 * @param {Number} n from n
 * @param {Number} k select k
 * @return {Number} combinations of k from n
 */
function binomial(n, k) {
    if (!memory[n]) {
        memory[n] = {};
    }

    if (!memory[n][k]) {
        var result = 1;

        for (var i = 1; i <= k; i++) {
            result *= (n + 1 - i) / i;
        }

        memory[n][k] = Math.round(result);
    }

    return memory[n][k];
}

export { binomial };
