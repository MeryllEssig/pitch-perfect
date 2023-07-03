import { NumberPitch, WordPitch } from '../../../model/wordPitch';
import { PitchStrategy } from '../PitchStrategy';

export class CutStrategy implements PitchStrategy {
  doAction<T extends WordPitch>(
    prevPrevWord: T | null,
    prevWord: T | null,
    currentWord: T,
    nextWord: T | null,
    nextNextWord: T | null
  ): T {
    console.log('CutStrategy');
    currentWord.pitch = currentWord.pitch.slice(0, -1);
    return currentWord;
  }

  checkIfStrategyApplies<T extends WordPitch>(
    prevPrevWord: T | null,
    prevWord: T | null,
    currentWord: T,
    nextWord: T | null,
    nextNextWord: T | null
  ): boolean {
    return nextWord !== null;
  }
}
