import { AnimationFrameScheduler } from '../engine/scheduler';
import { Engine } from '../engine/engine';
import { Drawable } from '../engine/drawable';
import { Animation } from '../engine/animation';
import { Point } from '../math/point';
import { cubicBezier, linear } from '../math/easing_functions';
import { moveAnimation, circleAnimation, arcAnimation, bezierAnimation } from '../engine/simple_animations';
import { DrawableGroup, DrawableLoop } from '../engine/higher_order_drawables';
import * as shapes from '../drawingPrimitives/shapes';

import { FpsMeter } from './drawables/fpsMeter';
import { Clear } from './drawables/clear';

import './style/style.scss';
import rarePepe from './assets/Rare-Pepe-Illuminati.png';

/**
 * Circle rendering drawable
 * @param {Point} position aaa
 * @returns {Drawable} drawable which renders a static circle
 */
function cirleDrawable(position = new Point(0, 0)) {
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
 * @param {Point} position aaa
 * @returns {Drawable} drawable
 */
function squareDrawable(position = new Point(0, 0)) {
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

    var circle = squareDrawable();
    var fpsMeter = new FpsMeter(new Point(20, 20));

    var start = squareDrawable(new Point(-100, 0));
    var end = squareDrawable(new Point(100, 0));

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

    // circle = circleAnimation(circle, 1000, { radius: 35 }, {
    //     loop: true,
    //     alternate: false,
    //     easing: linear
    // });

    // circle = bezierAnimation(circle, 4000, {
    //     points: [
    //         new Point(100, 100),
    //         new Point(100, 500),
    //         new Point(700, 333),
    //         new Point(111, 553),
    //         new Point(999, 115),
    //         new Point(10, 10),
    //         new Point(555, 666),
    //         new Point(1000, 100)
    //     ]
    // }, {
    //     loop: true,
    //     alternate: true,
    //     easing: linear
    // });

    circle = arcAnimation(circle, 1000, {
        radius: 60,
        from: { angle: Math.PI * 1.5 },
        to: { angle: Math.PI * 2.5 }
    }, {
        loop: true,
        alternate: true,
        easing: cubicBezier()
    });

    // circle = moveAnimation(circle, 10000, {
    //     from: new Point(100, 100),
    //     to: new Point(900, 100)
    // }, {
    //     loop: true,
    //     alternate: true,
    //     easing: cubicBezier()
    // });

    // circle = circleAnimation(circle, 900, {
    //     radius: 35,
    //     clockwise: false
    // }, {
    //     loop: true,
    //     alternate: false,
    //     easing: linear
    // });

    // var move1 = moveAnimation(circle, 333, {
    //     from: new Point(-25, -25),
    //     to: new Point(25, -25)
    // }, {
    //     loop: false,
    //     alternate: false,
    //     easing: linear
    // });

    // var move2 = moveAnimation(circle, 333, {
    //     from: new Point(25, -25),
    //     to: new Point(0, 40)
    // }, {
    //     loop: false,
    //     alternate: true,
    //     easing: linear
    // });

    // var move3 = moveAnimation(circle, 333, {
    //     from: new Point(0, 40),
    //     to: new Point(-25, -25)
    // }, {
    //     loop: false,
    //     alternate: true,
    //     easing: linear
    // });

    // var chain = new DrawableLoop([move1, move2, move3]);

    // var move4 = moveAnimation(chain, 3370, {
    //     from: new Point(0, 0),
    //     to: new Point(1000, 300)
    // }, {
    //     loop: true,
    //     alternate: true,
    //     easing: linear
    // });

    var grp = new DrawableGroup([circle], new Point(400, 300));

    engine.start();
    engine.pushDrawable(new Clear());
    engine.pushDrawable(grp);
    engine.pushDrawable(fpsMeter);
}

export { startGame };
