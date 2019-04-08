import { Log4TSWorker } from './log4ts.worker';

export const worker = new Log4TSWorker(self);

addEventListener('message', ($event: MessageEvent) => {
  worker.handleMsg($event);
});
