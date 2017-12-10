'use strict';

import { Point } from './point';
import { Vector } from './vector';
import { BezierCurve } from './bezier_curve';

/**
 * @typedef {function(Number):Point} Path;
 */

/**
 *
 * @param {Number} radius Radius of semicircle
 * @param {Number} start starting angle of rotation
 * @param {Number} end ending angle of rotation
 * @returns {Path} an arc path
 */
function arcPath(radius, start, end) {
    var startVector = Vector.fromPoints(
        Point.origin,
        new Point(0, radius)
    );

    var arcSize = end - start;

    return t => {
        var curAngle = start + t * arcSize;
        var positioningVector = startVector.rotateVector(curAngle);
        return Point.origin.add(positioningVector);
    };
}
/**
 * Get a circulat path
 * @param {Number} radius Radius of the circle
 * @param {Number} initialRotation Initial rotation
 * @param {Boolean} clockwise determines if rotation is anticlockwise
 * @returns {Path} a circular path
 */
function circularPath(radius, initialRotation = 0, clockwise = true) {
    var start, end;
    if (clockwise) {
        start = initialRotation + Math.PI * 2;
        end = initialRotation;
    } else {
        start = initialRotation;
        end = initialRotation + Math.PI * 2;
    }
    return arcPath(radius, start, end);
}

/**
 * Get cubic bezier path
 * @param {Point[]} points Array containing the starting point, control points
 * and the end point
 * @returns {Path} a cubic bezier path
 */
function bezierCurvePath(points) {
    var curve = new BezierCurve(points);
    return curve.getFunction();
}

export { arcPath, circularPath, bezierCurvePath };
