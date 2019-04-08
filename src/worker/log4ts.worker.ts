import { LogMessageModel } from './model/logMessageModel';
import { FetchLogStore } from '../fetch-log.store';

export class Log4TSWorker {
  constructor(private workerCtx: any) {}

  handleMsg($event: MessageEvent): void {
    const { category, msg, level } = $event.data as LogMessageModel;
    FetchLogStore.INSTANCE.addLog(category, msg, level);
  }
}
