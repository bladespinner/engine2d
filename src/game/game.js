import { AnimationFrameScheduler } from '../engine/scheduler';
import { Engine } from '../engine/engine';
import { Drawable } from '../engine/drawable';
import { Animation } from '../engine/animation';
import { Point } from '../math/point';
import { cubicBezier, linear } from '../math/easing_functions';
import { moveAnimation } from '../engine/simple_animations';
import { DrawableGroup, DrawableLoop } from '../engine/higher_order_drawables';
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
    var position = new Point(0, 0);

    return new Drawable(position, (prevFrame, curFrame) => {
        var ctx = curFrame.context;
        ctx.strokeStyle = '#44aa44';
        ctx.lineWidth = 5;
        ctx.fillStyle = '#e8e8e8';
        shapes.circle(ctx, { radius: 15 });
    });
}

/**
 * Draws a square
 * @returns {Drawable} drawable
 */
function squareDrawable() {
    var position = new Point(0, 0);

    return new Drawable(position, (prevFrame, curFrame) => {
        var ctx = curFrame.context;
        ctx.strokeStyle = '#44aa44';
        ctx.lineWidth = 5;
        ctx.fillStyle = '#e8e8e8';
        shapes.rectangle(ctx, { width: 15, height: 15 });
    });
}

// /**
//  * @returns {void}
//  */
// function moveAnimation() {
//     var xStart = 15;
//     var yStart = 400;
//     var xEnd = 700;
//     var yEnd = 56;

//     var drawable = cirleDrawable();

//     var anim = new Animation(
//         new Point(0, 0),
//         function (prevFrame, curFrame) {
//             var x = this.animate(xStart, xEnd);
//             var y = this.animate(yStart, yEnd);

//             drawable.position = new Point(x, y);
//             drawable.draw(prevFrame, curFrame);
//         }, 1000, {
//             loop: true,
//             alternate: true,
//             easing: cubicBezier()
//         }
//     );

//     var originalInitialization = anim.initialize.bind(anim);

//     anim.initialize = function (curFrame) {
//         originalInitialization(curFrame);
//         drawable.initialize(curFrame);
//     };

//     return anim;
// }

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

    var circle = cirleDrawable();
    var fpsMeter = new FpsMeter(new Point(20, 20));

    // var movingCircle = moveAnimation(circle, 1000, {
    //     from: new Point(20, 20),
    //     to: new Point(400, 400)
    // }, {
    //     loop: true,
    //     alternate: true,
    //     easing: cubicBezier()
    // });

    // var movingFpsMeter = moveAnimation(fpsMeter, 2357, {
    //     from: new Point(20, 20),
    //     to: new Point(200, 20)
    // }, {
    //     loop: true,
    //     alternate: true,
    //     easing: cubicBezier()
    // });

    // var grp = new DrawableGroup([movingCircle, movingFpsMeter]);

    // var movingGroup = moveAnimation(grp, 5000, {
    //     from: new Point(0, 0),
    //     to: new Point(1000, 500)
    // }, {
    //     loop: true,
    //     alternate: true,
    //     easing: linear
    // });

    var move1 = moveAnimation(circle, 333, {
        from: new Point(-25, -25),
        to: new Point(25, -25)
    }, {
        loop: false,
        alternate: false,
        easing: linear
    });

    var move2 = moveAnimation(circle, 333, {
        from: new Point(25, -25),
        to: new Point(0, 40)
    }, {
        loop: false,
        alternate: true,
        easing: linear
    });

    var move3 = moveAnimation(circle, 333, {
        from: new Point(0, 40),
        to: new Point(-25, -25)
    }, {
        loop: false,
        alternate: true,
        easing: linear
    });

    var chain = new DrawableLoop([move1, move2, move3]);

    var move4 = moveAnimation(chain, 3370, {
        from: new Point(0, 0),
        to: new Point(1000, 300)
    }, {
        loop: true,
        alternate: true,
        easing: linear
    });

    var grp = new DrawableGroup([chain], new Point(400, 250));

    engine.start();
    engine.pushDrawable(new Clear());
    engine.pushDrawable(move4);
    engine.pushDrawable(fpsMeter);
}

export { startGame };
