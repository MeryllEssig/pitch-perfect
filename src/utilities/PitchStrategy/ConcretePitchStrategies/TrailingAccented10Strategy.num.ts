// Class that herits from PitchStrategy and implements the 1000P strategy
import { NumberPitch, WordPitch } from '../../../model/wordPitch';
import { WordType } from '../../../model/wordType';
import { heibanka, keepPitchDown, keepPitchUpBeforeDownstep } from '../../word';
import { PitchStrategy } from '../PitchStrategy';

export class TrailingAccented10Strategy implements PitchStrategy {
  doAction<T extends WordPitch>(
    prevPrevWord: T | null,
    prevWord: T | null,
    currentWord: T,
    nextWord: T | null,
    nextNextWord: T | null
  ): T {
    console.log('TrailingAccented10Strategy');
    if (currentWord.wType.includes(WordType.NumberTrailingAccented10OrAccented100)) {
      currentWord.pitch = heibanka(currentWord.pitch);
    }
    if (
      prevWord?.wType.includes(WordType.NumberTrailingAccented10OrAccented100) &&
      currentWord.wType.includes(WordType.Number)
    ) {
      currentWord.pitch = keepPitchUpBeforeDownstep(currentWord.pitch);
    }
    return currentWord;
  }

  checkIfStrategyApplies<T extends WordPitch>(
    prevPrevWord: T | null,
    prevWord: T | null,
    currentWord: T,
    nextWord: T | null,
    nextNextWord: T | null
  ): boolean {
    if (
      prevWord?.wType.includes(WordType.NumberTrailingAccented10OrAccented100) &&
      currentWord.wType.includes(WordType.Number)
    ) {
      return true;
    } else if (
      currentWord.wType.includes(WordType.NumberTrailingAccented10OrAccented100) &&
      nextWord?.wType.includes(WordType.Number)
    ) {
      return true;
    }
    return false;
  }
}
