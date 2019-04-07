export class CustomEvent {
    private listeners = [];

    /**
     * @param method method to be added
     */
    addListener(method) {
        this.listeners.push(method);
    }

    /**
     * @param method method to be removed
     */
    removeListener(method) {
        var foundIndexes = this.findListenerIndexes(method);

        for (var i = 0; i < foundIndexes.length; i++) {
            this.listeners.splice(foundIndexes[i], 1);
        }
    }

    /**
     * @param handler
     */
    dispatch(handler) {
        for (var i = 0; i < this.listeners.length; i++) {
            try {
                this.listeners[i](handler);
            } catch (e) {
                log4jsLogger && log4jsLogger.warn("Could not run the listener " + this.listeners[i] + ". \n" + e);
            }
        }
    }

,

    /**
     * @param method
     */
    private findListenerIndexes(method) {
        var indexes = [];
        for (var i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i] === method) {
                indexes.push(i);
            }
        }

        return indexes;
    }

}
