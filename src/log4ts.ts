import { Logger } from './logger';
import { Level } from './level.enum';
import { logWriter } from './log-writer.type';
import { LogMessageModel } from './worker/model/logMessageModel';

export class Log4TS {
  private static INSTANCE: Log4TS;
  private readonly loggers: { [name: string]: Logger } = {};
  private worker!: Worker;

  private constructor(
    private _defaultLevel: Level,
    private _defaultWriters: logWriter[],
    private workerMode = false,
    private workerUrlPath = ''
  ) {
    if (workerMode) {
      if (workerUrlPath === null || workerUrlPath === undefined || workerUrlPath.length === 0) {
        throw new Error('Require worker url!');
      }
      this.worker = new Worker(workerUrlPath);
    }
  }

  static postWorkerLogMessage(category: string, msg: string, level: Level): void {
    if (Log4TS.INSTANCE.worker !== undefined) {
      Log4TS.INSTANCE.worker.postMessage({ category, msg, level } as LogMessageModel);
    }
  }

  static get defaultLevel(): Level {
    return Log4TS.INSTANCE.defaultLevel;
  }

  static set defaultLevel(value: Level) {
    Log4TS.INSTANCE.defaultLevel = value;
  }

  set defaultLevel(value: Level) {
    this._defaultLevel = value;
    // override all logger level
    Object.values(this.loggers).forEach(logger => (logger.level = value));
  }

  static get defaultWriters(): logWriter[] {
    return Log4TS.INSTANCE.defaultWriters;
  }

  static set defaultWriters(value: logWriter[]) {
    Log4TS.INSTANCE.defaultWriters = value;
  }

  set defaultWriters(value: logWriter[]) {
    this._defaultWriters = value;
    Object.values(this.loggers).forEach(logger => (logger.writers = value));
  }

  get defaultLevel(): Level {
    return this._defaultLevel;
  }

  get defaultWriters(): logWriter[] {
    return this._defaultWriters;
  }

  static getLogger(category: string): Logger {
    return Log4TS.INSTANCE.getLogger(category);
  }

  static init(options: { defaultLevel?: Level; defaultWriters?: logWriter[]; workerMode?: boolean; workerUrlPath?: string }): void {
    const _options = {
      ...{
        defaultLevel: Level.ALL,
        defaultWriters: [],
        workerMode: false,
        workerUrlPath: undefined
      },
      ...options
    };
    if (Log4TS.INSTANCE !== undefined) {
      throw Error('Reinit log4TS!');
    }
    Log4TS.INSTANCE = new Log4TS(_options.defaultLevel, _options.defaultWriters, _options.workerMode, _options.workerUrlPath);
  }

  static addLogger(category: string, logger: Logger): void {
    Log4TS.INSTANCE.addLogger(category, logger);
  }

  static removeLogger(category: string): void {
    Log4TS.INSTANCE.removeLogger(category);
  }

  getLogger(category: string): Logger {
    if (this.loggers[category] !== undefined) {
      return this.loggers[category];
    }
    const newLogger = new Logger(category, this._defaultLevel, this._defaultWriters);
    this.loggers[category] = newLogger;
    return newLogger;
  }

  addLogger(name: string, logger: Logger): void {
    if (this.loggers[name] !== undefined) {
      throw new Error('Not override logger!');
    }
    this.loggers[name] = logger;
  }

  removeLogger(name: string): void {
    if (this.loggers[name] !== undefined) {
      delete this.loggers[name];
    }
  }
}
