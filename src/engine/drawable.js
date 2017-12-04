'use strict';

import { Point } from '../math/point';
import { Frame } from './frame';

/**
 * Drawable class
 */
class Drawable {
    /**
     * Construct a new drawable.
     * @param {Point} position The location at which the drawable should.
     * @param {function(Frame, Frame, Drawable):void} render Drawable rendering
     * function.
     */
    constructor(position, render) {
        this.position = position;
        this.render = render;

        /**
         * A promise resolved when the drawable no longer needs to be rendered.
         * @type {Promise<void>}
         */
        this.end = new Promise((resolve, reject) => {
            this.finish = resolve;
            this.interrupt = reject;
        });
    }
    /**
     * Draw the drawable
     * @param {Frame} prevFrame previous animation frame.
     * @param {Frame} curFrame current animation frame.
     * @returns {void}
     */
    draw(prevFrame, curFrame) {
        var ctx = curFrame.context;

        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        this.render(prevFrame, curFrame, this);
        ctx.restore();

        throw 'draw() Not Implemented for this Drawable.';
    }
}

export { Drawable };
