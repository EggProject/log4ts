import { Level } from '../../level.enum';

export interface LogMessageModel {
  readonly category: string;
  readonly msg: string;
  readonly level: Level;
}
