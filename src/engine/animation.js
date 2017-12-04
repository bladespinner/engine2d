'use strict';


import { Drawable } from './drawable';

/**
 * Drawable class
 */
class Animation extends Drawable {
    /**
     * Construct a new drawable.
     * @param {Point} position The location at which the drawable should.
     * @param {function(Frame, Frame, Drawable):void} render Drawable rendering
     * @param {Number} length Time in miliseconds the animation lasts
     * @param {Boolean} loop Is the animation looping
     * function.
     */
    constructor(position, render, length, loop = false) {
        super(position, render);
        this._length = length;
        this._loop = loop;
    }


    /**
     * Draw the drawable
     * @param {Frame} prevFrame previous animation frame.
     * @param {Frame} curFrame current animation frame.
     * @returns {void}
     */
    draw(prevFrame, curFrame) {
        if (!this._start) {
            this._start = curFrame.timestamp;
            this._progress = 0;
        }
        super.draw(prevFrame, curFrame);
    }
}

export { Drawable };
