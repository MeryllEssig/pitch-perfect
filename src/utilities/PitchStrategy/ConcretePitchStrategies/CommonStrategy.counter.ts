// Class that herits from PitchStrategy and implements the 1000P strategy
import { elongations } from '../../../data/wordPitch';
import { NumberPitch, WordPitch } from '../../../model/wordPitch';
import { WordType } from '../../../model/wordType';
import { isFullDown, isHeiban } from '../../pitchType';
import { heibanka, keepPitchDown, keepPitchUpBeforeDownstep, nakadakakaLast } from '../../word';
import { PitchStrategy } from '../PitchStrategy';

export class CommonStrategy implements PitchStrategy {
  static computeIfPrevPrevPartGetsTransformed(word: string): boolean {
    return false;
  }

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
        currentWord.word.slice(0, -1) === 'っ' ||
        elongations.includes(currentWord.word.slice(-2))
      ) {
        currentWord.pitch = nakadakakaLast(currentWord.pitch);
      } else {
        if (prevWord?.pitch && isHeiban(prevWord?.pitch, true)) {
          currentWord.pitch = heibanka(currentWord.pitch);
        }
      }
    }
    if (currentWord.wType.includes(WordType.CommonCounter)) {
      currentWord.pitch = keepPitchDown(currentWord.pitch);
    }
    console.log(nextNextWord);
    // 13 is atamadaka, the 3 part is full down, we want to know we odakaize the 2 parts since they form a whole (when applying common counter rules)
    if (nextNextWord?.wType.includes(WordType.CommonCounter)) {
      if (nextWord && isFullDown(nextWord?.pitch)) {
        console.log('test');
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
    if (nextNextWord?.wType.includes(WordType.CommonCounter)) {
      return true;
    }
    if (nextWord?.wType.includes(WordType.CommonCounter)) {
      return true;
    }
    if (currentWord.wType.includes(WordType.CommonCounter)) {
      return true;
    }
    return false;
  }
}
