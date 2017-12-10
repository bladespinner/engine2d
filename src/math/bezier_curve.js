'use strict';


import { Point } from './point';
import { binomial } from './binomial_coefficient';

/**
 * A class representing a bezier curve
 */
class BezierCurve {
    /**
     * Construct a new bezier curve
     * @param {Point[]} points Start, control and ending points.
     */
    constructor(points) {
        this.points = points;
    }

    /**
     * Degree of the curve
     * @returns {Number} degree.
     */
    get degree() {
        return this.points.length - 1;
    }

    /**
     * @returns {function(Number):Point} Bezier function
     */
    getFunction() {
        var degree = this.degree;
        var pts = this.points.map((pt, idx) =>
            this.points[idx].scale(binomial(degree, idx)));

        return t => {
            var resultPt = Point.origin;

            pts.map((pt, idx) => pt.scale(Math.pow(1 - t, degree - idx) *
                    Math.pow(t, idx)))
                .forEach(pt => {
                    resultPt = resultPt.add(pt);
                });

            return resultPt;
        };
    }
}

export { BezierCurve };
