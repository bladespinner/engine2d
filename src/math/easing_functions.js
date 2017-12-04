'use strict';

import { Point } from './point';

/**
 * Linear scaling
 * @param {Number} t Value to be transformed
 * @returns {Number} Transformed value
 */
function linear(t) {
    return t;
}

/**
 * Cubic bezier scaling function
 * @param {Point} p1 First bezier control point
 * @param {Point} p2 Second bezier control point
 * @returns {function(Number):Number} Easing cubic bezier function
 */
function cubicBezier(p1 = new Point(0, 1), p2 = new Point(1, 0)) {
    var p0 = new Point(0, 0);
    var p3 = new Point(1, 1);

    return t => {
        var revT = 1 - t;
        return p0.scale(revT * revT * revT)
            .add(p1.scale(3 * revT * revT * t))
            .add(p2.scale(3 * revT * t * t))
            .add(p3.scale(t * t * t)).x;
    };
}

export { linear, cubicBezier };
