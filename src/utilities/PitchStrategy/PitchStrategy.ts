import { NumberPitch, WordPitch } from '../../model/wordPitch';

export interface PitchStrategy {
  doAction<T extends WordPitch>(
    prevPrevWord: T | null,
    previousWord: T | null,
    currentWord: T,
    nextWord: T | null,
    nextNextWord: T | null
  ): T;

  checkIfStrategyApplies<T extends WordPitch>(
    prevPrevWord: T | null,
    previousWord: T | null,
    currentWord: T,
    nextWord: T | null,
    nextNextWord: T | null
  ): boolean;
}
