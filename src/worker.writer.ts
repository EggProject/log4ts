import { Level } from './level.enum';
import { Log4TS } from './log4ts';

export function workerWriter(category: string, msg: string, level: Level): void {
  Log4TS.postWorkerLogMessage(category, msg, level);
}
