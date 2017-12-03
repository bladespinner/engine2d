/**
 * A animation frame, containing the creation timestamp
 * and a reference to the context
 */
class Frame {
    /**
     * Construct a new frame
     * @param {CanvasRenderingContext2D} context Canvas rendering
     * context reference
     */
    constructor(context) {
        this.timestamp = Date.now();
        this.context = context;
    }
}

export { Frame };
