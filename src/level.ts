/**
 * Log4js.Level Enumeration. Do not use directly. Use static objects instead.
 */
export class Level {
    private static readonly OFF_INT = Number.MAX_VALUE;
    /**
     * Logging Level OFF - all disabled
     */
    static readonly OFF = new Level(Level.OFF_INT, "OFF");
    private static readonly FATAL_INT = 50000;
    /**
     * Logging Level Fatal
     */
    static readonly FATAL = new Level(Level.FATAL_INT, "FATAL");
    private static readonly ERROR_INT = 40000;
    /**
     * Logging Level Error
     */
    static readonly ERROR = new Level(Level.ERROR_INT, "ERROR");
    private static readonly WARN_INT = 30000;
    /**
     * Logging Level Warn
     */
    static readonly WARN = new Level(Level.WARN_INT, "WARN");
    private static readonly INFO_INT = 20000;
    /**
     * Logging Level Info
     */
    static readonly INFO = new Level(Level.INFO_INT, "INFO");
    private static readonly DEBUG_INT = 10000;
    /**
     * Logging Level Debug
     */
    static readonly DEBUG = new Level(Level.DEBUG_INT, "DEBUG");
    private static readonly TRACE_INT = 5000;
    /**
     * Logging Level Trace
     */
    static readonly TRACE = new Level(Level.TRACE_INT, "TRACE");
    private static readonly ALL_INT = Number.MIN_VALUE;
    /**
     * Logging Level All - All traces are enabled
     */
    static readonly ALL = new Level(Level.ALL_INT, "ALL");

    /**
     * @param {Number} level number of level
     * @param {String} levelStr String representation of level
     */
    constructor(private level: number, private levelStr: string) {
    }

    /**
     * converts given String to corresponding Level
     * @param {String} sArg String value of Level
     * @param {Log4js.Level} defaultLevel default Level, if no String representation
     */
    toLevel(sArg, defaultLevel): Level {
        if (sArg === null) {
            return defaultLevel;
        }

        if (typeof sArg == "string") {
            var s = sArg.toUpperCase();

            switch (s) {
                case "ALL":
                    return Level.ALL;
                case "DEBUG":
                    return Level.DEBUG;
                case "INFO":
                    return Level.INFO;
                case "WARN":
                    return Level.WARN;
                case "ERROR":
                    return Level.ERROR;
                case "FATAL":
                    return Level.FATAL;
                case "OFF":
                    return Level.OFF;
                case "TRACE":
                    return Level.TRACE;
                default:
                    return defaultLevel;
            }
        } else if (typeof sArg == "number") {
            switch (sArg) {
                case Level.ALL_INT:
                    return Level.ALL;
                case Level.DEBUG_INT:
                    return Level.DEBUG;
                case Level.INFO_INT:
                    return Level.INFO;
                case Level.WARN_INT:
                    return Level.WARN;
                case Level.ERROR_INT:
                    return Level.ERROR;
                case Level.FATAL_INT:
                    return Level.FATAL;
                case Level.OFF_INT:
                    return Level.OFF;
                case Level.TRACE_INT:
                    return Level.TRACE;
                default:
                    return defaultLevel;
            }
        } else {
            return defaultLevel;
        }
    }

    /**
     * @return  converted Level to String
     */
    toString(): string {
        return this.levelStr;
    }

    /**
     * @return internal Number value of Level
     */
    valueOf(): number {
        return this.level;
    }
}
