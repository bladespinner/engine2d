'use strict';

import { Frame } from './frame';

const RUNSTATE = {
    PAUSED: Symbol(),
    RUNNING: Symbol(),
    STOPPED: Symbol()
};

/**
 * Abstract rendering sheduler
 */
class Scheduler {
    /**
     * Create a new rendering scheduler.
     * @param {CanvasRenderingContext2D} context Canvas rendering context.
     */
    constructor(context) {
        this._context = context;
        this._actions = {};
        this._runState = RUNSTATE.STOPPED;
        /**
         * @type {Frame}
         */
        this._currentFrame = null;
        this._actionIdSequence = 0;
    }
    /**
     * @param {function(Frame, Frame):void} action Sheduled action.
     * @returns {number} the action id
     */
    addAction(action) {
        var actionId = this._actionIdSequence;
        this._actions[actionId] = action;
        this._actionIdSequence++;
        return actionId;
    }

    /**
     * Remove an action by action id.
     * @param {number} actionId An action id.
     * @returns {void}
     */
    removeAction(actionId) {
        delete this._actions[actionId];
    }

    get currentFrame() {
        return this._currentFrame;
    }

    /**
     * Internal - Execute all actions bound to sheduler
     * @param {Frame} curFrame previous animation frame
     * @param {Frame} prevFrame current animcation frame
     * @returns {void}
     */
    _executeActions(curFrame, prevFrame) {
        Object.keys(this._actions).forEach(key => {
            var action = this._actions[key];
            action(curFrame, prevFrame);
        });
    }

    /**
     * @returns {Boolean} true is sheduler is running.
     */
    get isRunning() {
        return this._runState === RUNSTATE.RUNNING;
    }

    /**
     * @returns {Boolean} true is sheduler is paused.
     */
    get isPaused() {
        return this._runState === RUNSTATE.PAUSED;
    }

    /**
     * @returns {Boolean} true is sheduler is stopped.
     */
    get isStopped() {
        return this._runState === RUNSTATE.STOPPED;
    }

    /**
     * Start the sheduler
     * @return {void}
     */
    start() {
        var isStopped = this.isStopped;
        var isRunning = this.isRunning;
        this._runState = RUNSTATE.RUNNING;

        if (isStopped) {
            this._startShedule();
        } else if (isRunning) {
            this._resumeShedule();
        }
    }

    /**
     * Stop the sheduler
     * @return {void}
     */
    stop() {
        if (!this.isStopped) {
            this._runState = RUNSTATE.STOPPED;
            this._stopShedule();
        }
    }

    /**
     * Pause the sheduler
     * @return {void}
     */
    pause() {
        if (this.isRunning) {
            this._runState = RUNSTATE.PAUSED;
            this._pauseShedule();
        }
    }
}

/**
 * Rendering sheduler using requestAnimationFrame
 */
class AnimationFrameScheduler extends Scheduler {
    /**
     * Create a new animation frame scheduler.
     * @param {CanvasRenderingContext2D} context Canvas rendering context.
     */
    constructor(context) {
        super(context);
    }

    _runShedule() {
        if (this.isStopped) {
            return;
        }

        var prevFrame = this._currentFrame;

        var frame = new Frame(this._context);
        if (this.isPaused) {
            frame.timestamp = this.pauseTime;
        }
        frame.timestamp -= this.accumulatedPause;

        this._currentFrame = frame;

        if (!prevFrame) {
            prevFrame = frame;
        }

        this._executeActions(frame, prevFrame);

        var cb = this._runShedule.bind(this);
        this.frameId = window.requestAnimationFrame(cb);
    }

    _startShedule() {
        this.pauseTime = null;
        this.accumulatedPause = 0;

        var cb = this._runShedule.bind(this);
        this.frameId = window.requestAnimationFrame(cb);
    }
    _resumeShedule() {
        this.accumulatedPause += Date.now() - this.pauseTime;
        this.pauseTime = null;
    }
    _stopShedule() {
        window.cancelAnimationFrame(this.frameId);
    }
    _pauseShedule() {
        this.pauseTime = Date.now();
    }
}

// TODO: implement step by step sheduler for debugging purposes.

export { Scheduler, AnimationFrameScheduler, RUNSTATE };
