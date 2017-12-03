'use strict';

import { NumberTuple } from './number_tuple';

/**
 * A class representing a 2d-point
 */
class Point extends NumberTuple {
    /**
     * Constructor for new points.
     * @param {number} x x-coordinate of the point.
     * @param {number} y y-coordinate of the point.
     */
    constructor(x, y) {
        super(x, y);
    }

    /**
     * Get the point at the origin of the coordinate system.
     * @returns {Point} the origin of the coordinate system.
     */
    static get origin() {
        return new Point(0, 0);
    }

    /**
     * Get the string representation of the point.
     * @returns {String} the string representation of the point.
     */
    toString() {
        return `Point(${this.x}, ${this.y})`;
    }
}

export { Point };
