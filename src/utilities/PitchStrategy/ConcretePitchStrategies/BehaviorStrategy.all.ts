import { NumberPitch, WordPitch } from '../../../model/wordPitch';
import { PitchStrategy } from '../PitchStrategy';

export class BehaviorStrategy implements PitchStrategy {
  doAction<T extends WordPitch>(
    prevPrevWord: T | null,
    prevWord: T | null,
    currentWord: T,
    nextWord: T | null,
    nextNextWord: T | null
  ): T {
    console.log('BehaviorStrategy');
    if (nextWord?.behaviors) {
      nextWord.behaviors.forEach(behavior => {
        if (
          behavior.wordConcerned === currentWord.word ||
          behavior.wordConcerned === (currentWord as unknown as NumberPitch)?.wordAlt
        ) {
          if (behavior.where === 'before') {
            currentWord.kana = behavior.behavior;
          }
        }
        if (
          behavior.wordConcerned === '10' &&
          !isNaN(Number(currentWord)) &&
          Number(currentWord.word) % 10 === 0 &&
          Number(currentWord.word) < 100
        ) {
          // JUU case (10, 20, 30, 40, 50, 60, 70, 80, 90) and not 100 where the next counter modifies the word
          if (behavior.where === 'before') {
            // We take care of replacing the じゅう only, not the whole number word
            currentWord.kana.replace('じゅう', behavior.behavior);
          }
        }
        if (
          behavior.wordConcerned === '100' &&
          !isNaN(Number(currentWord)) &&
          Number(currentWord.word) % 100 === 0 &&
          Number(currentWord.word) < 1000
        ) {
          // HYAKU case (100, 200, 300, 400, 500, 600, 700, 800, 900) and not 1000 where the next counter modifies the word
          if (behavior.where === 'before') {
            // We take care of replacing the ゃく only, not the whole number word.  I've removed the ひ because it takes dakutens
            currentWord.kana.replace('ゃく', structuredClone(behavior.behavior).replace('ひゃ', 'ゃ'));
          }
        }
      });
    }
    if (prevWord?.behaviors) {
      prevWord.behaviors.forEach(behavior => {
        if (
          behavior.wordConcerned === currentWord.word ||
          behavior.wordConcerned === (currentWord as unknown as NumberPitch)?.wordAlt
        ) {
          if (behavior.where === 'after') {
            currentWord.kana = behavior.behavior;
          }
        }
      });
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
    if (prevWord?.behaviors || nextWord?.behaviors) {
      return true;
    }
    return false;
  }
}
