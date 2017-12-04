'use strict';

import { Frame } from './frame';
import { Drawable } from './drawable';
import { Scheduler } from './scheduler';

/**
 * Animation engine class
 */
class Engine {
    /**
     * Construct a new Engine
     * @param {Scheduler} sheduler Animation rendering sheduler
     */
    constructor(sheduler) {
        /**
         * @type {Drawable[]}
         */
        this._drawables = [];

        this._sheduler = sheduler;
        this._sheduler.addAction(this.redraw.bind(this));

        this.start = sheduler.start.bind(sheduler);
        this.stop = sheduler.stop.bind(sheduler);
        this.pause = sheduler.pause.bind(sheduler);

        this.isRunning = () => sheduler.isRunning;
        this.isStopped = () => sheduler.isStopped;
        this.isPaused = () => sheduler.isPaused;
    }

    /**
     * Redraw all drawables
     * @param {Frame} prevFrame Current animation frame
     * @param {Frame} curFrame Previous animation frame
     * @returns {void}
     */
    redraw(prevFrame, curFrame) {
        this._drawables.forEach(drawable =>
            drawable.draw(prevFrame, curFrame));
    }

    /**
     * Add a new drawable object to the back of the drawing list
     * @param {Drawable} drawable A drawable object.
     * @returns {Promise<void>} A promise resolved when the drawable ends and is
     * removed from the drawables list
     */
    pushDrawable(drawable) {
        this._drawables.push(drawable);

        return drawable.end.then(() => {
            var idx = this._drawables.indexOf(drawable);
            this._drawables.splice(idx, 1);
        });
    }

    /**
     * Add a new drawable object to the back of the drawing list
     * @param {Drawable} drawable A drawable object.
     * @returns {Promise<void>} A promise resolved when the drawable ends and is
     * removed from the drawables list
     */
    unshiftDrawable(drawable) {
        this._drawables.unshift(drawable);

        return drawable.end.then(() => {
            var idx = this._drawables.indexOf(drawable);
            this._drawables.splice(idx, 1);
        });
    }
}

export { Engine };
