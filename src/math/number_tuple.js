'use strict';

/**
 * A tuple of two numbers.
 */
class NumberTuple {
    /**
     * NumberTuple constructor
     * @param {number} x x-coordinate of the tuple.
     * @param {number} y y-coordinate of the tuple.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Add another number tuple to this one, returning a new tuple.
     * @param {NumberTuple} tuple Another NumberTuple.
     * @returns {NumberTuple} A new number tuple, the sum of this and the
     * other one.
     */
    add(tuple) {
        return new this.constructor(
            this.x + tuple.x,
            this.y + tuple.y
        );
    }

    /**
     * Substract another number tuple from this one, returning a new tuple.
     * @param {NumberTuple} tuple Another NumberTuple.
     * @returns {NumberTuple} A new number tuple, the sum of this and the
     * other one.
     */
    substract(tuple) {
        return new this.constructor(
            this.x - tuple.x,
            this.y - tuple.y
        );
    }

    /**
     * Get the string representation of the tuple.
     * @returns {String} String representation of the tuple.
     */
    toString() {
        return `NumberTuple(${this.x}, ${this.y})`;
    }

    /**
     * Check if this tuple is equal to another
     * @param {Tuple} tuple another tuple.
     * @returns {Boolean} true if the tuples are equal.
     */
    equals(tuple) {
        return this.x === tuple.x && this.y === tuple.y;
    }

    /**
     * @returns {Boolean} true if this represents the tuple with both
     * coordinates equal to zero
     */
    get isZero() {
        return this.x === 0 && this.y === 0;
    }
}

export { NumberTuple };
