import { Level } from './level.enum';
import { FetchLogStore } from './fetch-log.store';

export function fetchWriter(category: string, msg: string, level: Level): void {
  FetchLogStore.INSTANCE.addLog(category, msg, level);
}
