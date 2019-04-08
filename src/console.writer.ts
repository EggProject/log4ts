import { Level } from './level.enum';
import { ConsoleLogger } from './console.logger';

/**
 * TODO check isset ConsoleLogger.originalConsoleRef
 */
export function consoleWriter(name: string, msg: string, level: Level): void {
  const args: any = [`%c${name}:`, 'background: #222; color: yellow; font-weight: bold', msg];
  switch (level) {
    case Level.TRACE:
      ConsoleLogger.originalConsoleRef.trace.apply(ConsoleLogger.originalConsoleRef, args);
      break;
    case Level.DEBUG:
      ConsoleLogger.originalConsoleRef.debug.apply(ConsoleLogger.originalConsoleRef, args);
      break;
    case Level.INFO:
      // const fn = Function.prototype.bind.call((console as any)['oldInfo'], console);
      // fn.apply(console, args);
      // fn(msg);
      ConsoleLogger.originalConsoleRef.info.apply(ConsoleLogger.originalConsoleRef, args);
      break;
    case Level.WARN:
      ConsoleLogger.originalConsoleRef.warn.apply(ConsoleLogger.originalConsoleRef, args);
      break;
    case Level.ERROR:
      ConsoleLogger.originalConsoleRef.error.apply(ConsoleLogger.originalConsoleRef, args);
      break;
    case Level.FATAL:
      ConsoleLogger.originalConsoleRef.error.apply(ConsoleLogger.originalConsoleRef, args);
      break;

    default:
      ConsoleLogger.originalConsoleRef.info.apply(ConsoleLogger.originalConsoleRef, args);
  }
}
