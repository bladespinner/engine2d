'use strict';

import { Drawable } from '../../engine/drawable';
import { Point } from '../../math/point';

/**
 * Drawable class
 */
class Clear extends Drawable {
    constructor() {
        super(new Point(0, 0), (prevFrame, curFrame) => {
            var ctx = curFrame.context;
            var canvas = ctx.canvas;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    }
}

export { Clear };
