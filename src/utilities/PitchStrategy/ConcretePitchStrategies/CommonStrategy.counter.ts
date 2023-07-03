// Class that herits from PitchStrategy and implements the 1000P strategy
import { NumberPitch, WordPitch } from '../../../model/wordPitch';
import { WordType } from '../../../model/wordType';
import { heibanka, keepPitchDown, keepPitchUpBeforeDownstep, nakadakakaLast } from '../../word';
import { PitchStrategy } from '../PitchStrategy';

export class CommonStrategy implements PitchStrategy {
  doAction<T extends WordPitch>(
    prevPrevWord: T | null,
    prevWord: T | null,
    currentWord: T,
    nextWord: T | null,
    nextNextWord: T | null
  ): T {
    console.log('CommonStrategy');
    if (nextWord?.wType.includes(WordType.CommonCounter)) {
      if (
        currentWord.word.slice(0, -1) === 'ん' ||
        ['えい', 'おう', 'ああ', 'いい'].includes(currentWord.word.slice(-2))
      ) {
        currentWord.pitch = nakadakakaLast(currentWord.pitch);
      } else {
        currentWord.pitch = heibanka(currentWord.pitch);
      }
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
    if (nextWord?.wType.includes(WordType.CommonCounter)) {
      return true;
    }
    if (currentWord.wType.includes(WordType.CommonCounter)) {
      return true;
    }
    return false;
  }
}
