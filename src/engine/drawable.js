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
     * @param {function(Frame, Frame):void} render Drawable rendering
     * function.
     */
    constructor(position, render) {
        this.position = position;

        /**
         * @this {Drawable}
         */
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
     * Initialize the rendering of the drawable
     * @param {Frame} curFrame Current animation frame
     * @returns {void}
     */
    initialize(curFrame) {
        this.startingFrame = curFrame;
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
        this.render.bind(this)(prevFrame, curFrame);
        ctx.restore();
    }
}

export { Drawable };
