import { Logger } from './logger';
import { Level } from './level.enum';
import { consoleWriter } from './console.writer';
import { logWriter } from './log-writer.type';

/**
 * Line number visible: https://stackoverflow.com/questions/13815640/a-proper-wrapper-for-console-log-with-correct-line-number
 */
export class ConsoleLogger extends Logger {
  public static originalConsoleRef: Console;
  private static inited = false;

  constructor(level: Level, window: Window, writers: logWriter[] = []) {
    super('CONSOLE', level, [consoleWriter, ...writers]);
    if (ConsoleLogger.inited) {
      throw new Error('Double init console logger');
    }
    ConsoleLogger.inited = true;

    ConsoleLogger.originalConsoleRef = window.console;

    (window as any).console = this;
  }

  trace(...args: any): void {
    this.writeLog(args.join(' '), Level.TRACE);
  }

  debug(...args: any): void {
    this.writeLog(args.join(' '), Level.DEBUG);
  }

  info(...args: any): void {
    this.writeLog(args.join(' '), Level.INFO);
  }

  warn(...args: any): void {
    this.writeLog(args.join(' '), Level.WARN);
  }

  error(...args: any): void {
    this.writeLog(args.join(' '), Level.ERROR);
  }

  assert(...args: any): void {
    ConsoleLogger.originalConsoleRef.warn('Assert not implemented');
    ConsoleLogger.originalConsoleRef.assert(...args);
  }

  clear(): void {
    ConsoleLogger.originalConsoleRef.clear();
  }

  count(...args: any): void {
    ConsoleLogger.originalConsoleRef.warn('Count not implemented');
    ConsoleLogger.originalConsoleRef.count(...args);
  }

  countReset(...args: any): void {
    ConsoleLogger.originalConsoleRef.warn('CountReset not implemented');
    ConsoleLogger.originalConsoleRef.countReset(...args);
  }

  dir(...args: any): void {
    ConsoleLogger.originalConsoleRef.warn('Dir not implemented');
    ConsoleLogger.originalConsoleRef.dir(...args);
  }

  group(...args: any): void {
    ConsoleLogger.originalConsoleRef.warn('Group not implemented');
    ConsoleLogger.originalConsoleRef.group(...args);
  }

  groupCollapsed(): void {
    ConsoleLogger.originalConsoleRef.warn('GroupCollapsed not implemented');
    ConsoleLogger.originalConsoleRef.groupCollapsed();
  }

  groupEnd(...args: any): void {
    ConsoleLogger.originalConsoleRef.warn('GroupEnd not implemented');
    ConsoleLogger.originalConsoleRef.groupEnd();
  }

  table(...args: any): void {
    ConsoleLogger.originalConsoleRef.warn('Table not implemented');
    ConsoleLogger.originalConsoleRef.table(...args);
  }

  time(...args: any): void {
    ConsoleLogger.originalConsoleRef.warn('Time not implemented');
    ConsoleLogger.originalConsoleRef.time(...args);
  }

  timeEnd(...args: any): void {
    ConsoleLogger.originalConsoleRef.warn('TimeEnd not implemented');
    ConsoleLogger.originalConsoleRef.timeEnd(...args);
  }

  timeLog(...args: any): void {
    ConsoleLogger.originalConsoleRef.warn('TimeLog not implemented');
    ConsoleLogger.originalConsoleRef.timeEnd(...args);
  }

  markTimeline(...args: any): void {
    ConsoleLogger.originalConsoleRef.warn('MarkTimeline not implemented');
    ConsoleLogger.originalConsoleRef.markTimeline(...args);
  }

  profile(...args: any): void {
    ConsoleLogger.originalConsoleRef.warn('Profile not implemented');
    ConsoleLogger.originalConsoleRef.profile(...args);
  }

  profileEnd(...args: any): void {
    ConsoleLogger.originalConsoleRef.warn('ProfileEnd not implemented');
    ConsoleLogger.originalConsoleRef.profileEnd(...args);
  }

  timeStamp(...args: any): void {
    ConsoleLogger.originalConsoleRef.warn('TimeStamp not implemented');
    ConsoleLogger.originalConsoleRef.timeStamp(...args);
  }

  timeline(...args: any): void {
    ConsoleLogger.originalConsoleRef.warn('Timeline not implemented');
    ConsoleLogger.originalConsoleRef.timeline(...args);
  }

  timelineEnd(...args: any): void {
    ConsoleLogger.originalConsoleRef.warn('TimelineEnd not implemented');
    ConsoleLogger.originalConsoleRef.timelineEnd(...args);
  }

  log(...args: any): void {
    this.info(...args);
  }

  set writers(value: logWriter[]) {
    this._writers = [consoleWriter, ...value];
  }
}
