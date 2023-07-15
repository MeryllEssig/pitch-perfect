import { NumberPitch, WordPitch } from '../../model/wordPitch';
import { PitchStrategy } from './PitchStrategy';

/*
 * This class is responsible for managing the pitch strategies.
 * It is a singleton.
 * It has a list of pitch strategies.
 * It applies the pitch strategies to a word.
 * It returns the word with the pitch accent applied.
 */
export class PitchStrategyManager {
  private _pitchStrategies: PitchStrategy[] = [];

  public registerPitchStrategy(pitchStrategy: PitchStrategy) {
    this._pitchStrategies.push(pitchStrategy);
  }

  applyPitchStrategy(
    prevPrevWord: WordPitch | null,
    prevWord: WordPitch | null,
    currentWord: WordPitch,
    nextWord: WordPitch | null,
    nextNextWord: WordPitch | null
  ): WordPitch | NumberPitch {
    let numPitch = structuredClone(currentWord);
    this._pitchStrategies.forEach(pitchStrategy => {
      if (
        pitchStrategy.checkIfStrategyApplies(
          prevPrevWord,
          prevWord,
          numPitch,
          nextWord,
          nextNextWord
        )
      ) {
        numPitch = pitchStrategy.doAction(prevPrevWord, prevWord, numPitch, nextWord, nextNextWord);
      }
    });
    return numPitch;
  }
}
