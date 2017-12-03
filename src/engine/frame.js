/**
 * A animation frame, containing the creation timestamp
 * and a reference to the context
 */
class Frame {
    constructor(context) {
        this.timestamp = Date.now();
        this.context = context;
    }
}

export { Frame };
