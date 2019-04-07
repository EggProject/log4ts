/**
 * @fileoverview log4js is a library to log in JavaScript in similar manner
 * than in log4j for Java. The API should be nearly the same.
 *
 * This file contains all log4js code and is the only file required for logging.
 */
export class Log4TS {
    /**
     * Date of logger initialized.
     */
    static readonly applicationStartDate = new Date();

    /**
     * Hashtable of loggers.
     */
    private static readonly loggers = {};

    /**
     * Get a logger instance. Instance is cached on categoryName level.
     * @param  {String} categoryName name of category to log to.
     * @return {Logger} instance of logger for the category
     */
    static getLogger(categoryName): Logger {

        // Use default logger if categoryName is not specified or invalid
        if (typeof categoryName !== "string") {
            categoryName = "[default]";
        }

        if (!Log4js.loggers[categoryName]) {
            // Create the logger for this name if it doesn't already exist
            Log4js.loggers[categoryName] = new Log4js.Logger(categoryName);
        }

        return Log4js.loggers[categoryName];
    }

    /**
     * Get the default logger instance.
     * @return {Logger} instance of default logger
     */
    static getDefaultLogger(): Logger {
        return Log4js.getLogger("[default]");
    }

    static extend(destination, source) {
        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    }

    static bind(fn, object) {
        return function () {
            return fn.apply(object, arguments);
        };
    };

    /**
     * Atatch an observer function to an elements event browser independent.
     *
     * @param element element to attach event
     * @param name name of event
     * @param observer observer method to be called
     */
    private attachEvent(element, name, observer) {
        if (element.addEventListener) { //DOM event model
            element.addEventListener(name, observer, false);
        } else if (element.attachEvent) { //M$ event model
            element.attachEvent('on' + name, observer);
        }
    }
}
