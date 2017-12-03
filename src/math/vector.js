'use strict';

import { NumberTuple } from './number_tuple';
import { Point } from './point';

/**
 * A class representing a 2d-vector
 */
class Vector extends NumberTuple {
    /**
     * Constructor for new vectors.
     * @param {number} x x-coordinate of the vector.
     * @param {number} y y-coordinate of the vector.
     */
    constructor(x, y) {
        super(x, y);
    }

    /**
     * Scale this vector by a number factor.
     * @param {Number} factor the number factor.
     * @returns {Vector} a new scaled vector.
     */
    scale(factor) {
        return new Vector(this.x * factor, this.y * factor);
    }

    /**
     * Get a vector perpendicular to this one
     * @returns {Vector} a vector perpendicular to this one with the same length
     */
    perpendicular() {
        return new Vector(-this.y, this.x);
    }

    /**
     * Get a vector oposite to this one
     * @returns {Vector} a vector oposite to this one with the same length
     */
    oposite() {
        return new Vector(-this.x, -this.y);
    }

    /**
     * Get the dot product of this vector and another.
     * @param {Vector} vector Another vector.
     * @returns {number} the dot product.
     */
    dotProduct(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    /**
     * The length of the vector;
     * @returns {number} the length of the vector.
     */
    get length() {
        return Math.sqrt(this.dotProduct(this));
    }

    /**
     * Get the angle between this vector and another in radians;
     * @param {Vector} vector Another vector.
     * @returns {number} angle in radians between the two vectors.
     */
    angle(vector) {
        var cos = this.dotProduct(vector) / (this.length * vector.length);
        return Math.acos(cos);
    }

    /**
     * Is the parameter vector oposite of this one.
     * @param {Vector} vector another vector.
     * @returns {Boolean} true if the vector is oposite of this one.
     */
    isOposite(vector) {
        return this.scale(-1).equals(vector);
    }

    /**
     * Is the parameter vector perpendicular to this one.
     * @param {Vector} vector another vector.
     * @returns {Boolean} true if the vector is perpendicular of this one.
     */
    isPerpendicular(vector) {
        var thisUnit = this.unit();
        var thatUnit = vector.unit();
        var opositeUnit = thatUnit.oposite();
        return thisUnit.x === -thatUnit.y && thisUnit.y === thatUnit.x ||
            thisUnit.x === -opositeUnit.y && thisUnit.y === opositeUnit.x;
    }

    /**
     * Is the parameter vector oposite of this one.
     * @param {Vector} vector another vector.
     * @returns {Boolean} if the vector oposite of this one.
     */
    isParalel(vector) {
        return this.unit().equals(vector.unit());
    }

    /**
     * Get the unit vector of this vector
     * @returns {Vector} the unit vector.
     */
    unit() {
        var scale = 1 / this.length;
        return this.scale(scale);
    }

    /**
     * Move a point along this vector.
     * @param {Point} point A point.
     * @returns {Point} new point, moved by this vector from the original point.
     */
    translatePoint(point) {
        return point.add(this);
    }

    /**
     * Rotate a vector by an angle
     * @param {Number} angle a angle in radians
     * @returns {Vector} A new vector with the same magnitude, but rotated by
     * angle radians
     */
    rotateVector(angle) {
        // Since computer screens are right-hand coordinate systems (y increases
        // downwards) as oposed to the standart left-hand coordinate system, we
        // need to flip the angle
        angle = -angle;

        return new Vector(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle)
        );
    }

    /**
     * Construct a vector from two points.
     * @param {Point} pointA vector starting point.
     * @param {Point} pointB vector ending point.
     * @returns {Vector} vector between pointA and pointB.
     */
    static fromPoints(pointA, pointB) {
        var difference = pointB.substract(pointA);
        return new Vector(difference.x, difference.y);
    }

    /**
     * Construct a vector from a single point. The start point is the origin
     * @param {Point} point vector end point.
     * @returns {Vector} vector between pointA and pointB.
     */
    static fromPoint(point) {
        // We implicitly substract with the zero point = (0, 0);
        return new Vector(point.x, point.y);
    }

    /**
     * Get the string representation of the vector
     * @returns {String} the string representation of the vector.
     */
    toString() {
        return `Vector(${this.x}, ${this.y})`;
    }
}

export { Vector };
