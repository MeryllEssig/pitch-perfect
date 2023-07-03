import { noMoraChars } from '../data/wordPitch';
import { NumberPitch, WordPitch } from '../model/wordPitch';
import { WordType } from '../model/wordType';
import { PitchAccentService } from '../services/PitchAccent.service';
import { containsAtLeastOne } from './array';
import { isAtamadaka, isHeiban } from './pitchType';
import {
  heibanka,
  kanjiArrayToArrayOfNumberPitch,
  keepPitchDown,
  keepPitchUp,
  numberToArrayOfKanji,
  odakaka,
} from './word';

// Create function that computes the pitch accent of a number
// export function computeNumberPitchAccent(num: number): NumberPitch[] {
//   // For each char depending of its position, compute the japanese word
//   const numberKanjis = numberToArrayOfKanji(num);
//   const numberPitches = kanjiArrayToArrayOfNumberPitch(numberKanjis);

//   const newWordPitches: NumberPitch[] = [];
//   const pitchAccentService = new PitchAccentService();
//   // Apply the rules using word data
//   for (let i = 0; i < numberPitches.length; i++) {
//     const prevNumPitch = numberPitches[i - 1] || null;
//     const numPitch = numberPitches[i];
//     const nextNumPitch = numberPitches[i + 1] || null;

//     numberPitches[i] = pitchAccentService
//       .getPitchStrategyManager()
//       .applyPitchStrategy(prevNumPitch, numPitch, nextNumPitch) as NumberPitch;
//   }
//   return numberPitches;
// }

export function computeCounterPitchAccent(num: number, counterWord: WordPitch): string {
  // Transform number to a string
  const numString = num.toLocaleString();
  // Check the behavior of the counter word
  const behaviors = counterWord.behaviors;
  // If the number as a behavior, use it to compute the japanese word. Hint : keep kana number strings in an array

  // If the number does not have a behavior, for each char depending of its position, compute the japanese word

  // Apply the rules using word data for the number, along with the rules for the counter

  return '';
}

// chooseBehavior is for wordTypes that have multiple Rules applyable.
function applyWordTypeRule(
  endKanaNumber: string,
  endKanaNumberInitialPitch: string,
  counterWord: WordPitch,
  chooseBehavior = 0
) {
  const counterWordRules: WordType[] = Array.isArray(counterWord.wType)
    ? counterWord.wType
    : [counterWord.wType];
  const counterWordRule = counterWordRules[chooseBehavior];

  switch (counterWordRule) {
    case WordType.CommonCounter:
      console.log('CommonCounter');
      break;
    default:
      throw new Error('Word type is needed');
      break;
  }
}

// make pitch string to heiban/odaka/atamadaka
// levelize next pitch string by using the previous one. If str1 is Heiban, str2 is heiban, make str2 stay high.
