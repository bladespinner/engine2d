/**
 * @param {CanvasRenderingContext2D} context a 2d rendering context
 * @param {function():void} cb Rendering function
 * @param {Number} x x offset
 * @param {Number} y y offset
 * @returns {void}
 */
function contextDraw(context, cb, x, y) {
    context.save();
    context.translate(x, y);
    cb();
    context.fill();
    context.stroke();
    context.restore();
}

/**
 * Draw a rectangle in a 2d rendering context
 * @param {CanvasRenderingContext2D} context asfaf
 * @param {{width: Number, height: Number}} options asdasd
 * @returns {void}
 */
function rectangle(context, options) {
    contextDraw(context, () => {
        context.beginPath();
        context.rect(0, 0, options.width, options.height);
    }, -options.width / 2, -options.height / 2);
}

/**
 * Draw a square in a 2d rendering context
 * @param {CanvasRenderingContext2D} context asfaf
 * @param {{width: Number}} options asdasd
 * @returns {void}
 */
function square(context, options) {
    rectangle(context, {
        width: options.width,
        height: options.width
    });
}

/**
 * Draw a circle in a 2d rendering context
 * @param {CanvasRenderingContext2D} context asfaf
 * @param {{radius: Number}} options asdasd
 * @returns {void}
 */
function circle(context, options) {
    contextDraw(context, () => {
        context.beginPath();
        context.arc(0, 0, options.radius, 0, Math.PI * 2, false);
    }, -options.radius / 2, -options.radius / 2);
}

/**
 * Draw a text in a 2d rendering context
 * @param {CanvasRenderingContext2D} context asfaf
 * @param {{text: String, maxWidth: Number}} options asdasd
 * @returns {void}
 */
function text(context, options) {
    context.save();
    context.fillText(options.text, 0, 0, options.maxWidth);
    context.strokeText(options.text, 0, 0, options.maxWidth);
    context.restore();
}

export {
    rectangle,
    square,
    circle,
    text
};
