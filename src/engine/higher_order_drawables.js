'use strict';

import { Drawable } from './drawable';
import { Point } from '../math/point';

class DrawableGroup extends Drawable {
    /**
     * Construct a drawable group
     * @param {Drawable[]} drawables grouped drawables
     * @param {Point} position drawable position
     */
    constructor(drawables, position = Point.origin) {
        super(position, function (prevFrame, curFrame) {
            drawables.forEach(drawable => drawable.draw(prevFrame, curFrame));
        });

        this.end.then(() => {
            drawables.forEach(drawable => drawable.finish());
        });

        this._drawables = drawables;
    }

    initialize(curFrame) {
        super.initialize(curFrame);
        this._drawables.forEach(drawable => drawable.initialize(curFrame));
    }
}

class DrawableChain extends Drawable {

}

class DrawableLoop extends Drawable {
    /**
     *
     * @param {Drawable[]} drawables d1
     * @param {Point} position pos
     */
    constructor(drawables, position = Point.origin) {
        var initialDrawable = drawables[0];

        super(position, function (prevFrame, curFrame) {
            this._curFrame = curFrame;
            this._drawables[this._drawableIdx].draw(prevFrame, curFrame);
        });

        this._drawables = drawables;
        this._drawableIdx = 0;
        this._curFrame = null;

        this._loopedOnce = false;

        initialDrawable.end.then(() => {
            this.chainDrawable(initialDrawable);
        });

        this.initialDrawable = initialDrawable;
    }

    chainDrawable(drawable) {
        drawable.end.then(() => {
            this._drawableIdx++;
            if (this._drawableIdx >= this._drawables.length) {
                this._drawableIdx = 0;
                this._loopedOnce = true;
            }
            var nextDr = this._drawables[this._drawableIdx];
            if (!this._loopedOnce) {
                nextDr.initialize(this._curFrame);
            } else {
                nextDr.reset(this._curFrame);
            }
            this.chainDrawable(nextDr);
        });
    }

    initialize(curFrame) {
        this.initialDrawable.initialize(curFrame);
    }
}

//class DrawableLoop extends Drawable { TODO

export { DrawableChain, DrawableGroup, DrawableLoop };
