// Class that herits from PitchStrategy and implements the 1000P strategy
import { NumberPitch, WordPitch } from '../../../model/wordPitch';
import { WordType } from '../../../model/wordType';
import { heibanka } from '../../word';
import { PitchStrategy } from '../PitchStrategy';

export class SenManStrategy implements PitchStrategy {
  doAction<T extends WordPitch>(
    prevPrevWord: T | null,
    previousWord: T | null,
    currentWord: T,
    nextWord: T | null,
    nextNextWord: WordPitch | null
  ): T {
    console.log('SenManStrategy');
    currentWord.pitch = heibanka(currentWord.pitch);
    return currentWord;
  }

  checkIfStrategyApplies<T extends WordPitch>(
    prevPrevWord: T | null,
    prevWord: T | null,
    currentWord: T,
    nextWord: T | null,
    nextNextWord: WordPitch | null
  ): boolean {
    if (
      currentWord.wType.includes(WordType.Number) &&
      nextWord !== null &&
      nextWord.wType.includes(WordType.Number1000P)
    ) {
      return true;
    }
    return false;
  }
}
