import { noMoraChars, numberPitch } from '../data/wordPitch';
import { NumberPitch, WordPitch } from '../model/wordPitch';
import { KanjiNumber } from '../model/wordType';
import { isHeiban, isOdaka } from './pitchType';

export function heibanka(pitchPattern: string): string {
  return pitchPattern
    .split('')
    .map((value, idx) => {
      return idx === 0 ? 'L' : 'H';
    })
    .join('');
}
export function atamadakaka(pitchPattern: string): string {
  return pitchPattern
    .split('')
    .map((value, idx) => {
      return idx === 0 ? 'H' : 'L';
    })
    .join('');
}
export function odakaka(pitchPattern: string): string {
  if (pitchPattern.length > 2) {
    return pitchPattern
      .split('')
      .map((value, idx) => {
        return idx === 0 ? 'L' : idx + 1 === pitchPattern.length ? 'L' : 'H';
      })
      .join('');
  } else {
    return pitchPattern
      .split('')
      .map((value, idx) => {
        return idx + 1 === pitchPattern.length ? 'L' : 'H';
      })
      .join('');
  }
}

export function keepPitchUp(pitchPattern: string): string {
  return pitchPattern
    .split('')
    .map((value, idx) => {
      return 'H';
    })
    .join('');
}
export function keepPitchDown(pitchPattern: string): string {
  return pitchPattern
    .split('')
    .map((value, idx) => {
      return 'L';
    })
    .join('');
}

export function keepPitchUpBeforeDownstep(pitchPattern: string): string {
  const dropIndex = pitchPattern.indexOf('HL');

  return pitchPattern
    .split('')
    .map((value, idx) => {
      return idx <= dropIndex ? 'H' : 'L';
    })
    .join('');
}
export function keepPitchUpAtStartUntilDrop(pitchPattern: string): string {
  if (pitchPattern.startsWith('LH')) {
    return pitchPattern
      .split('')
      .map((value, idx) => {
        return idx === 0 ? 'H' : value;
      })
      .join('');
  }
  return pitchPattern;
}

export function nakadakakaLast(pitchPattern: string) {
  return heibanka(pitchPattern)
    .split('')
    .map((pitchVal, index) => {
      return pitchPattern.length - 1 === index || pitchPattern.length - 2 ? 'L' : pitchVal;
    })
    .join('');
}

export function kanaWordToArray(kana: string): string[] {
  const wordArray: string[] = [];
  const rawWordArray = kana.split('');
  rawWordArray.forEach((value, idx) => {
    if (idx === 0 && noMoraChars.includes(value)) {
      throw new Error('First character should not be a no mora character');
    } else if (!noMoraChars.includes(value)) {
      wordArray.push(value);
    } else if (noMoraChars.includes(value)) {
      wordArray[wordArray.length - 1] = wordArray[wordArray.length - 1].concat(value);
    }
  });
  return wordArray;
}

export function wordPitchArrayToPitchPattern(
  wordPitchArray: (WordPitch | NumberPitch)[]
): string[] {
  return wordPitchArray.map((wordPitch, index) => {
    return index !== wordPitchArray.length - 1
      ? wordPitch.pitch.substring(0, wordPitch.pitch.length - 1)
      : wordPitch.pitch;
  });
}

export function concatPitchPattern(pitches: string[], heibanOdakaJunction = false): string[] {
  const resultingPitches: string[] = [];
  for (let i = 0; i < pitches.length; i++) {
    let previousIsHeibanOrOdaka = false;
    if (i > 0 && (isHeiban(pitches[i - 1]) || isOdaka(pitches[i - 1]))) {
      previousIsHeibanOrOdaka = true;
    }
    let pitchToPush = pitches[i];
    if (i < pitches.length - 1) {
      pitchToPush = pitches[i].substring(0, pitches[i].length - 1);
    }
    resultingPitches.push(
      heibanOdakaJunction && previousIsHeibanOrOdaka ? keepPitchUp(pitchToPush) : pitchToPush
    );
  }
  return resultingPitches;
}

export function wordPitchKanaTransform(wordPitch: WordPitch, newKana: string): WordPitch {
  const newWordPitch: WordPitch = {
    ...wordPitch,
    kana: newKana,
  };
  return newWordPitch;
}

export function numberToArrayOfPoweredWordString(num: number): string[] {
  return String(num)
    .split('')
    .map(Number)
    .map((val, index, arr) => val * Math.pow(10, arr.length - 1 - index)) // Add power to each digit
    .map(String);
}

export function findNumberWordPitch(num: number): NumberPitch | undefined {
  const numWordPitch = numberPitch.find(value => {
    if (String(num) === value.word) {
      return value;
    }
  });
  return numWordPitch;
}
export function findKanjiWordPitch(kanji: string): NumberPitch | undefined {
  const numWordPitch = numberPitch.find(value => {
    if (kanji === value.wordAlt) {
      return value;
    }
  });
  return numWordPitch;
}

// 万、億 are packet number, and must appear even if they're technically 0
export function isSignificant0digit(position: number, numLength: number): boolean {
  return numLength - (position % 4) === 0;
}

const units = [
  '',
  '十',
  '百',
  '千',
  '',
  '十',
  '百',
  '千',
  '',
  '十',
  '百',
  '千',
  '',
  '十',
  '百',
  '千',
  '',
  '十',
  '百',
  '千',
];
const packets = ['', '万', '億', '兆', '京'];
const digits = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

/**
 * The function numberToArrayOfKanji converts a non-negative integer into
 * an array of Japanese Kanji numeral characters.
 *
 * @param num - A non-negative integer number to be converted into Japanese Kanji numerals
 * @returns Array<string> - An array of strings, each string being a Japanese Kanji numeral.
 */
export function numberToArrayOfKanji(num: number): string[] {
  if (num === 0) {
    return ['零'];
  }
  if (num === -1) {
    return ['何'];
  }
  if (num < 0 || num > 10000000000000000000 || num !== Math.round(num)) {
    throw new Error('Unhandled number');
  }
  const numStrReversed = String(num).split('').reverse().join('');
  // Initialize an empty array to store Kanji numerals
  const resultingKanjiNumberArray: string[] = [];

  let currentPacket = 0;
  let currentPacketHasBeenSet = false;
  for (let i = 0; i < numStrReversed.length; i++) {
    const currentDigitString = numStrReversed[i];
    const currentDigit = Number(currentDigitString);
    // Check if we've moved to a new packet (unit->万->億)
    if (currentPacket !== Math.floor(i / 4)) {
      currentPacket = Math.floor(i / 4);
      currentPacketHasBeenSet = false;
    }
    if (currentDigit !== 0 && !currentPacketHasBeenSet && currentPacket !== 0) {
      currentPacketHasBeenSet = true;
      resultingKanjiNumberArray.push(packets[currentPacket]);
    }
    if (currentDigit !== 0 && units[i] !== '') {
      resultingKanjiNumberArray.push(units[i]);
    }
    if (currentDigit > 1 || (currentDigit > 0 && i % 4 === 0)) {
      resultingKanjiNumberArray.push(digits[currentDigit]);
    }
  }
  return resultingKanjiNumberArray.reverse();
}

export function kanjiArrayToArrayOfNumberPitch(kanjis: string[]): NumberPitch[] {
  const numberPitchArr: NumberPitch[] = [];
  let isNextNumberTreated = false;
  for (let i = 0; i < kanjis.length; i++) {
    // Some irregular compounds like num+十 or num+百 are preferred
    if (digits.includes(kanjis[i]) && i + 1 < kanjis.length) {
      const twoDigitNumberPitch = findKanjiWordPitch(kanjis[i] + kanjis[i + 1]);
      if (twoDigitNumberPitch !== undefined) {
        numberPitchArr.push(structuredClone(twoDigitNumberPitch));
        isNextNumberTreated = true;
        continue;
      }
    }
    if (!isNextNumberTreated) {
      const oneDigitNumberPitch = findKanjiWordPitch(kanjis[i]);
      if (oneDigitNumberPitch !== undefined) {
        numberPitchArr.push(structuredClone(oneDigitNumberPitch));
      }
    }
    isNextNumberTreated = false;
  }
  return numberPitchArr;
}
