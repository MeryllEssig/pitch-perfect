// Class that herits from PitchStrategy and implements the 1000P strategy
import { NumberPitch, WordPitch } from '../../../model/wordPitch';
import { WordType } from '../../../model/wordType';
import { heibanka, keepPitchDown, keepPitchUpBeforeDownstep } from '../../word';
import { PitchStrategy } from '../PitchStrategy';

export class JuuStrategy implements PitchStrategy {
  doAction<T extends WordPitch>(
    prevPrevWord: T | null,
    prevWord: T | null,
    currentWord: T,
    nextWord: T | null,
    nextNextWord: T | null
  ): T {
    console.log('JuuStrategy');
    if (currentWord.word === '10' && nextWord?.word !== '3' && nextWord?.word !== '5') {
      currentWord.pitch = heibanka(currentWord.pitch);
    }
    if (prevWord?.word === '10' && currentWord.word !== '3' && currentWord.word !== '5') {
      currentWord.pitch = keepPitchUpBeforeDownstep(currentWord.pitch);
    }
    if ((prevWord?.word === '10' && currentWord.word === '3') || currentWord.word === '5') {
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
    if (currentWord.word === '10' && nextWord !== null && nextWord.wType.includes(WordType.Number)) {
      return true;
    }
    if (prevWord !== null && prevWord.word === '10' && currentWord.wType.includes(WordType.Number)) {
      return true;
    }
    return false;
  }
}
