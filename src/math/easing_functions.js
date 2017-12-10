'use strict';

import { Point } from './point';
import { BezierCurve } from './bezier_curve';

/**
 * Linear easing
 * @param {Number} t Value to be transformed
 * @returns {Number} Transformed value
 */
function linear(t) {
    return t;
}

/**
 * Bezier easing function
 * @returns {function(Number):Number} Bezier curve easing function
 */
function bezier() {
    var controlPoints = Array.prototype.slice.call(arguments);

    var start = new Point(0, 0);
    var end = new Point(1, 1);
    var copy = controlPoints.slice();

    copy.unshift(start);
    copy.push(end);

    var curve = new BezierCurve(copy);
    var fn = curve.getFunction();

    return t => fn(t).x;
}

/**
 * Cubic bezier easing function
 * @param {Point} p1 First bezier control point
 * @param {Point} p2 Second bezier control point
 * @returns {function(Number):Number} Easing cubic bezier function
 */
function cubicBezier(p1 = new Point(0, 1), p2 = new Point(1, 0)) {
    return bezier(p1, p2);
}

/**
 * Sum easing functions
 * @param {function(Number):Number} fn1 easing function
 * @param {function(Number):Number} fn2 easing function
 * @returns {function(Number):Number} easing function
 */
function sumEasing(fn1, fn2) {
    return t => (fn1(t) + fn2(t)) / 2;
}

/**
 * Get the 1 - t of an easing function
 * @param {function(Number):Number} fn easing function
 * @returns {function(Number):Number} easing function
 */
function negativeEasing(fn) {
    return t => 1 - fn(t);
}

export { linear, bezier, cubicBezier, sumEasing, negativeEasing };
