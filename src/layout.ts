/**
 * Interface for Layouts.
 * Use this Layout as "interface" for other Layouts. It is doing nothing.
 */
export class Layout {
    /**
     * Implement this method to create your own layout format.
     * @param {Log4js.LoggingEvent} loggingEvent loggingEvent to format
     * @return formatted String
     * @type String
     */
    format: /**
     * Returns the content type output by this layout.
     * @return The base class returns "text/plain".
     * @type String
     */
        getContentType
:,
    /**
     * @return Returns the header for the layout format. The base class returns null.
     * @type String
     */
    getHeader: /**
     * @return Returns the footer for the layout format. The base class returns null.
     * @type String
     */
        getFooter
:,
    /**
     * @return Separator between events
     * @type String
     */
    getSeparator:

    function(loggingEvent) {
        return "";
    }

,

    function() {
        return "text/plain";
    }

    function() {
        return null;
    }

,

    function() {
        return null;
    }

    function() {
        return "";
    }
}
