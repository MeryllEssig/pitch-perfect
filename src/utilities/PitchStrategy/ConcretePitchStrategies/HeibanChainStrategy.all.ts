// Class that herits from PitchStrategy and implements the 1000P strategy
import { NumberPitch, WordPitch } from '../../../model/wordPitch';
import { WordType } from '../../../model/wordType';
import { isAtamadaka, isHeiban } from '../../pitchType';
import { heibanka, keepPitchDown, keepPitchUpAtStartUntilDrop, keepPitchUpBeforeDownstep } from '../../word';
import { PitchStrategy } from '../PitchStrategy';

export class HeibanChainStrategy implements PitchStrategy {
  doAction<T extends WordPitch>(
    prevPrevWord: T | null,
    prevWord: T | null,
    currentWord: T,
    nextWord: T | null,
    nextNextWord: T | null
  ): T {
    console.log('HeibanChainStrategy');
    if (!isAtamadaka(currentWord.pitch)) {
      currentWord.pitch = keepPitchUpAtStartUntilDrop(currentWord.pitch);
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
    if (prevWord?.pitch && isHeiban(prevWord.pitch, true)) {
      return true;
    }
    return false;
  }
}
