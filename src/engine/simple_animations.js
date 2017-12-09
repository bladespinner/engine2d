'use strict';

import { Animation } from './animation';
import { Point } from '../math/point';

/**
 * @typedef {function(Frame,Frame,Drawable):void} Animator
 *
 * @typedef {function(Number):Number} EasingFn
 * @typedef {{loop: Boolean, alternate: Boolean, easing: EasingFn}} AnimOptions
 * @typedef {{from: Object, to: Object}} Transition
 * @typedef {function(Drawable,Number,Transition,AnimOptions):Animation} AnimFactory
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
    var fromPt = transition.from;
    var toPt = transition.to;

    drawable.position = new Point(
        this.animate(fromPt.x, toPt.x),
        this.animate(fromPt.y, toPt.y)
    );
    drawable.draw(prevFrame, curFrame);
}

var moveAnimation = createAnimationFactory(move);

export { moveAnimation };
