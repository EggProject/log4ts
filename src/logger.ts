import { Level } from './level.enum';
import { logWriter } from './log-writer.type';

export class Logger {
  protected _writers: logWriter[];

  constructor(private _category: string, private _level: Level, writers: logWriter[] | logWriter) {
    this._writers = !Array.isArray(writers) ? [writers] : writers;
  }

  get category(): string {
    return this._category;
  }

  get level(): Level {
    return this._level;
  }

  set level(value: Level) {
    this._level = value;
  }

  trace(msg: string): void {
    this.writeLog(msg, Level.TRACE);
  }

  debug(msg: string): void {
    this.writeLog(msg, Level.DEBUG);
  }

  info(msg: string): void {
    this.writeLog(msg, Level.INFO);
  }

  warn(msg: string): void {
    this.writeLog(msg, Level.WARN);
  }

  error(msg: string): void {
    this.writeLog(msg, Level.ERROR);
  }

  fatal(msg: string): void {
    this.writeLog(msg, Level.FATAL);
  }

  protected writeLog(msg: string, level: Level): void {
    if (this.level > level) {
      return;
    }
    this._writeLog(msg, level);
  }

  private _writeLog(msg: string, level: Level): void {
    this._writers.forEach(writer => writer(this.category, msg, level));
  }

  get writers(): logWriter[] {
    return this._writers;
  }

  set writers(value: logWriter[]) {
    this._writers = value;
  }

  log(msg: string, level: Level): void {
    switch (level) {
      case Level.TRACE:
        this.trace(msg);
        break;
      case Level.DEBUG:
        this.debug(msg);
        break;
      case Level.INFO:
        this.info(msg);
        break;
      case Level.WARN:
        this.warn(msg);
        break;
      case Level.ERROR:
        this.error(msg);
        break;
      case Level.FATAL:
        this.error(msg);
        break;

      default:
        this.info(msg);
    }
  }
}
