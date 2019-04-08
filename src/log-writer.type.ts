import { Level } from './level.enum';

export type logWriter = (category: string, msg: string, level: Level) => void;
