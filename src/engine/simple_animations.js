'use strict';

import { Animation } from './animation';
import { Point } from '../math/point';
import { Frame } from '../engine/frame';
import { circularPath, arcPath, bezierCurvePath } from '../math/paths';

/**
 * @typedef {function(Frame,Frame,Drawable):void} Animator
 *
 * @typedef {function(Number):Number} EasingFn
 * @typedef {{loop: Boolean, alternate: Boolean, easing: EasingFn}} AnimOptions
 * @typedef {{from: Object, to: Object}} Transition
 * @typedef {function(Drawable,Number,Transition,AnimOptions):Animation} AnimFactory
 *
 * @typedef {function(Number):Point} PathingFunction
 */

/**
 * @param {Animator} animate animation
 * @returns {AnimFactory} Animation Factory
 */
function createAnimationFactory(animate) {
    return (drawable, length, transition, options) => {
        var anim = new Animation(
            new Point(0, 0),
            function (prevFrame, curFrame) {
                animate.bind(this)(prevFrame, curFrame, transition, drawable);
            }, length, options
        );

        var originalInitialization = anim.initialize.bind(anim);

        anim.initialize = function (curFrame) {
            originalInitialization(curFrame);
            drawable.initialize(curFrame);
        };

        return anim;
    };
}

/**
 * @param {Frame} prevFrame a
 * @param {Frame} curFrame a
 * @param {Transition} transition a
 * @param {Drawable} drawable a
 * @this {Animation}
 * @return {void}
 */
function move(prevFrame, curFrame, transition, drawable) {
    var ctx = curFrame.context;
    var fromPt = transition.from;
    var toPt = transition.to;

    var pos = new Point(
        this.animate(fromPt.x, toPt.x),
        this.animate(fromPt.y, toPt.y)
    );

    ctx.save();
    ctx.translate(pos.x, pos.y);
    drawable.draw(prevFrame, curFrame);
    ctx.restore();
}

/**
 * @param {Frame} prevFrame a
 * @param {Frame} curFrame a
 * @param {PathingFunction} path a
 * @param {Drawable} drawable a
 * @this {Animation}
 * @return {void}
 */
function followPath(prevFrame, curFrame, path, drawable) {
    var progress = this.animate(0, 1);
    var pos = path(progress);
    var ctx = curFrame.context;

    ctx.save();
    ctx.translate(pos.x, pos.y);
    drawable.draw(prevFrame, curFrame);
    ctx.restore();
}

var moveAnimation = createAnimationFactory(move);
var pathAnimation = createAnimationFactory(followPath);

/**
 *
 * @param {*} drawable a
 * @param {*} length a
 * @param {*} pathOptions a
 * @param {*} options a
 * @return {*} a
 */
function arcAnimation(drawable, length, pathOptions, options) {
    var path = arcPath(
        pathOptions.radius,
        pathOptions.from.angle,
        pathOptions.to.angle
    );

    return pathAnimation(drawable, length, path, options);
}

/**
 *
 * @param {*} drawable a
 * @param {*} length a
 * @param {*} pathOptions a
 * @param {*} options a
 * @returns {*} a
 */
function circleAnimation(drawable, length, pathOptions, options) {
    var path = circularPath(
        pathOptions.radius,
        pathOptions.initial,
        pathOptions.clockwise
    );

    return pathAnimation(drawable, length, path, options);
}

/**
 *
 * @param {*} drawable a
 * @param {*} length a
 * @param {*} pathOptions a
 * @param {*} options a
 * @returns {*} a
 */
function bezierAnimation(drawable, length, pathOptions, options) {
    var path = bezierCurvePath(pathOptions.points);
    return pathAnimation(drawable, length, path, options);
}

export {
    moveAnimation,
    pathAnimation,
    circleAnimation,
    arcAnimation,
    bezierAnimation
};
