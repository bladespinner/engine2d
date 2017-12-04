'use strict';

import { Drawable } from '../../engine/drawable';
import { text } from '../../drawingPrimitives/shapes';

/**
 * Drawable class
 */
class FpsMeter extends Drawable {
    /**
     * Construct a new drawable.
     * @param {Point} position The location at which the drawable should.
     * function.
     */
    constructor(position) {
        var runningAvgFps = 0;
        var curFps = 0;
        var window = Date.now();
        super(position, (prevFrame, curFrame) => {
            var now = Date.now();
            if (now - window < 1000) {
                curFps++;
            } else {
                window = now;
                runningAvgFps = Math.floor((runningAvgFps + curFps) / 2);
                curFps = 1;
            }

            var ctx = curFrame.context;
            ctx.font = '15px Arial';
            text(ctx, { text: `FPS: ${runningAvgFps}` });
        });
    }
}

export { FpsMeter };
