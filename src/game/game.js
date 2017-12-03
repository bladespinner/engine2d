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
 * @returns {void}
 */
function startGame() {
    var canvasElement = getCanvasElement();
    var context = canvasElement.getContext('2d');
    var engine = new Engine(context);
    engine.start();
}

export { startGame };
