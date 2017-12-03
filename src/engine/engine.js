'use strict';

import { Frame } from './frame';
import { Drawable } from './drawable';

/**
 * Animation engine class
 */
class Engine {
    /**
     * Construct a new Engine
     * @param {CanvasRenderingContext2D} context An canvas rendering context
     */
    constructor(context) {
        this._running = false;
        this._context = context;
        this._renderSpeed = 1;
        /**
         * @type {Frame}
         */
        this._currentFrame = null;
        /**
         * @type {Drawable[]}
         */
        this._drawables = [];
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
     * The main draw loop, runs while running is true.
     * @param {Frame} prevFrame Last animation frame.
     * @returns {void}
     */
    loop() {
        if (!this.running) {
            return;
        }

        var prevFrame = this._currentFrame;

        var frame = new Frame(this._context);

        if (!prevFrame) {
            prevFrame = frame;
        }

        this.redraw(prevFrame, frame);

        this._currentRequestedFrameId =
            window.requestAnimationFrame(this.loop.bind(this));
    }

    /**
     * Start the engine
     * @returns {void}
     */
    start() {
        this.running = true;
        this.loop();
    }

    /**
     * Stop the engine
     * @returns {void}
     */
    stop() {
        this.running = false;
        this._currentFrame = null;
    }

    /**
     * Is the engine currently running
     * @returns {Boolean} returns if the engine is currently running.
     */
    isRunning() {
        return this._running;
    }
}

export { Engine };
