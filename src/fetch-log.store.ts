import { Subscription, timer } from 'rxjs';
import { Level } from './level.enum';

// TODO log stream, mert elofordulhat hogy meg nem ment el az elozo fetch es mar jon az ujabb
export class FetchLogStore {
  private static _INSTANCE: FetchLogStore;

  private logs: { msg: string; level: Level }[] = [];
  private timerSubscription!: Subscription;
  private runXhr = false;

  private constructor() {}

  static get INSTANCE(): FetchLogStore {
    if (FetchLogStore._INSTANCE === undefined) {
      FetchLogStore._INSTANCE = new FetchLogStore();
    }

    return FetchLogStore._INSTANCE;
  }

  /**
   * add log to store
   */
  addLog(category: string, msg: any, level: Level): void {
    if (msg !== undefined && msg !== null) {
      this.logs.push({ msg, level });

      // check size
      if (this.logs.length === 100) {
        this.sendLog();
      } else {
        this.startTimer();
      }
    }
  }

  /**
   * send ajax log
   */
  sendLog(): void {
    if (this.logs.length > 0) {
      this.runXhr = true;
      this._sendLog();
    }
  }

  private _sendLog(): void {
    this.clearTimer();

    const logs = [...this.logs];
    this.logs = [];
    fetch('http://localhost:3000/batch-log', {
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache',
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'content-type': 'application/json'
      }),
      body: JSON.stringify(logs)
    }).then(
      () => (this.runXhr = false),
      reason => {
        console.error(reason);
        this.logs = [...logs, ...this.logs];
        this.runXhr = false;
        this.startTimer();
      }
    );
  }

  /**
   * start auto send timer
   */
  private startTimer(): void {
    this.clearTimer();

    this.timerSubscription = timer(60 * 1000).subscribe(() => this.sendLog());
  }

  private clearTimer(): void {
    if (this.timerSubscription !== undefined && !this.timerSubscription.closed) {
      this.timerSubscription.unsubscribe();
    }
  }
}
