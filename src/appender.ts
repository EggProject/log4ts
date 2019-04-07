/**
 * Abstract base class for other appenders.
 * It is doing nothing.
 */
import {Layout} from './layout';

export abstract class Appender {
    private logger: Logger;
    private layout: Layout;

    /**
     * appends the given loggingEvent appender specific
     * @param {Log4js.LoggingEvent} loggingEvent loggingEvent to append
     */
    abstract doAppend(loggingEvent: LoggingEvent);

    /**
     * clears the Appender
     */
    abstract doClear();

    /**
     * Set the Layout for this appender.
     * @param {Log4js.Layout} layout Layout for formatting loggingEvent
     */
    setLayout(layout: Layout) {
        this.layout = layout;
    }

    /**
     * Set reference to the logger.
     * @param {Log4js.Logger} logger The invoking logger
     */
    setLogger(logger: Logger) {
        // add listener to the logger methods
        logger.onlog.addListener(Log4js.bind(this.doAppend, this));
        logger.onclear.addListener(Log4js.bind(this.doClear, this));

        this.logger = logger;
    }
}
