import { AnimationFrameScheduler } from '../engine/scheduler';
import { Engine } from '../engine/engine';

import './style/style.scss';
import rarePepe from './assets/Rare-Pepe-Illuminati.png';

/**
 * @returns {HTMLCanvasElement} The canvas in page
 */
function getCanvasElement() {
    return document.getElementById('canvas');
}

/**
 * Create a new engine.
 * @param {CanvasRenderingContext2D} context Canvas rendering context.
 * @returns {Engine} new engine.
 */
function createEngine(context) {
    var sheduler = new AnimationFrameScheduler(context);
    return new Engine(sheduler);
}

/**
 * @returns {void}
 */
function startGame() {
    var canvasElement = getCanvasElement();
    var context = canvasElement.getContext('2d');
    var engine = createEngine(context);
    engine.start();
}

export { startGame };
