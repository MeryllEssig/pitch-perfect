// Class that herits from PitchStrategy and implements the 1000P strategy
import { elongations } from '../../../data/wordPitch';
import { WordPitch } from '../../../model/wordPitch';
import { WordType } from '../../../model/wordType';
import { isFullDown, isHeiban } from '../../pitchType';
import { heibanka, keepPitchDown, keepPitchUp, nakadakakaOrAtamadakaka, odakaka } from '../../word';
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
    // 13 is atamadaka, the 3 part is full down, we want to know we odakaize the 2 parts since they form a whole (when applying common counter rules)
    if (
      nextNextWord?.wType.includes(WordType.CommonCounter) ||
      nextNextWord?.wType.includes(WordType.ShortWesternCounter)
    ) {
      console.log(nextWord?.pitch);
      if (nextWord && isFullDown(nextWord?.pitch)) {
        currentWord.pitch = heibanka(currentWord.pitch);
      }
    }
    if (
      nextWord?.wType.includes(WordType.CommonCounter) ||
      nextWord?.wType.includes(WordType.ShortWesternCounter)
    ) {
      console.log(currentWord.kana.slice(-1));
      if (
        currentWord.kana.slice(-1) === 'ん' ||
        currentWord.kana.slice(-1) === 'っ' ||
        elongations.includes(currentWord.kana.slice(-2))
      ) {
        currentWord.pitch = nakadakakaOrAtamadakaka(currentWord.pitch);
      } else if (prevWord?.pitch && isHeiban(prevWord?.pitch, true)) {
        currentWord.pitch = keepPitchUp(currentWord.pitch);
      } else if (prevWord?.pitch && !isHeiban(prevWord?.pitch, true)) {
        console.log(currentWord);
        currentWord.pitch = odakaka(currentWord.pitch);
      }
    }
    if (
      currentWord.wType.includes(WordType.CommonCounter) ||
      currentWord.wType.includes(WordType.ShortWesternCounter)
    ) {
      currentWord.pitch = keepPitchDown(currentWord.pitch);
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
      nextNextWord?.wType.includes(WordType.CommonCounter) ||
      nextNextWord?.wType.includes(WordType.ShortWesternCounter)
    ) {
      return true;
    }
    if (
      nextWord?.wType.includes(WordType.CommonCounter) ||
      nextWord?.wType.includes(WordType.ShortWesternCounter)
    ) {
      return true;
    }
    if (
      currentWord.wType.includes(WordType.CommonCounter) ||
      currentWord.wType.includes(WordType.ShortWesternCounter)
    ) {
      return true;
    }
    return false;
  }
}
