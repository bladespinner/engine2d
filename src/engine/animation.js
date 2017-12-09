'use strict';


import { Drawable } from './drawable';
import { linear } from '../math/easing_functions';


/**
 * Animation class
 * @typedef {function(Number):Number} EasingFn
 * @typedef {{loop: Boolean, alternate: Boolean, easing: EasingFn}} AnimOptions
 */
class Animation extends Drawable {
    /**
     * Construct a new drawable.
     * @param {Point} position The location at which the drawable should.
     * @param {function(Frame, Frame, Drawable):void} render Drawable rendering
     * @param {Number} length Time in miliseconds the animation lasts
     * @param {AnimOptions} options Animation options
     * function.
     */
    constructor(position, render, length, options = {
        loop: false,
        alternate: true,
        easing: linear
    }) {
        super(position, render);
        this._length = length;
        this._options = options;
        this._offset = 0;
    }

    /**
     * Calculate the current value of a variable by its start and end
     * @param {Number} start Starting value of the animated variable
     * @param {Number} end Ending value of the animated variable
     * @returns {Number} Current value of the animated variable
     */
    animate(start, end) {
        return start + (end - start) * this._offset;
    }

    /**
     * Draw the drawable
     * @param {Frame} prevFrame previous animation frame.
     * @param {Frame} curFrame current animation frame.
     * @returns {void}
     */
    draw(prevFrame, curFrame) {
        var runTime = curFrame.timestamp - this.startingFrame.timestamp;
        this._offset = runTime / this._length;

        if (this._options.loop) {
            var loopNumber = Math.floor(this._offset);
            this._offset -= loopNumber;
            if (this._options.alternate && loopNumber % 2 === 1) {
                this._offset = 1 - this._offset;
            }
        } else if (this._offset >= 1) {
            this.finish();
            this._offset = 1;
            super.draw(prevFrame, curFrame);
            return;
        }

        this._offset = this._options.easing(this._offset);

        super.draw(prevFrame, curFrame);
    }
}

export { Animation };
