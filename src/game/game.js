import { AnimationFrameScheduler } from '../engine/scheduler';
import { Engine } from '../engine/engine';
import { Drawable } from '../engine/drawable';
import { Animation } from '../engine/animation';
import { Point } from '../math/point';
import { cubicBezier } from '../math/easing_functions';
import * as shapes from '../drawingPrimitives/shapes';

import { FpsMeter } from './drawables/fpsMeter';
import { Clear } from './drawables/clear';

import './style/style.scss';
import rarePepe from './assets/Rare-Pepe-Illuminati.png';

/**
 * Circle rendering drawable
 * @returns {Drawable} drawable which renders a static circle
 */
function cirleDrawable() {
    var position = new Point(150, 50);

    return new Drawable(position, (prevFrame, curFrame) => {
        var ctx = curFrame.context;
        ctx.strokeStyle = '#44aa44';
        ctx.lineWidth = 5;
        ctx.fillStyle = '#e8e8e8';
        shapes.circle(ctx, { radius: 15 });
    });
}

/**
 * @returns {void}
 */
function moveAnimation() {
    var xStart = 15;
    var yStart = 400;
    var xEnd = 700;
    var yEnd = 56;

    var drawable = cirleDrawable();

    var anim = new Animation(
        new Point(0, 0),
        function (prevFrame, curFrame) {
            var x = this.animate(xStart, xEnd);
            var y = this.animate(yStart, yEnd);

            drawable.position = new Point(x, y);
            drawable.draw(prevFrame, curFrame);
        }, 1000, {
            loop: true,
            alternate: true,
            easing: cubicBezier()
        }
    );

    var originalInitialization = anim.initialize.bind(anim);

    anim.initialize = function (curFrame) {
        originalInitialization(curFrame);
        drawable.initialize(curFrame);
    };

    return anim;
}

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
    engine.pushDrawable(new Clear());
    engine.pushDrawable(moveAnimation());
    engine.pushDrawable(new FpsMeter(new Point(20, 20)));
}

export { startGame };
