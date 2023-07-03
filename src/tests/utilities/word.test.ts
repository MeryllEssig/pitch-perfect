import { numberPitch } from '../../data/wordPitch';
import { WordType } from '../../model/wordType';
import {
  atamadakaka,
  concatPitchPattern,
  heibanka,
  kanaWordToArray,
  kanjiArrayToArrayOfNumberPitch,
  numberToArrayOfKanji,
  numberToArrayOfPoweredWordString,
  odakaka,
  wordPitchArrayToPitchPattern,
} from '../../utilities/word';

test('世界 heibanized should be heiban', () => {
  expect(heibanka('HLLL')).toBe('LHHH');
});
test('世界 odakaized should be odaka', () => {
  expect(odakaka('HLLL')).toBe('LHHL');
});
test('日 odakaized should be odaka', () => {
  expect(odakaka('LH')).toBe('HL');
});
test('日 atamadakaized should be atamadaka', () => {
  expect(atamadakaka('LH')).toBe('HL');
});

test('しゅうしゅう　should be properly transformed to an array of individual moras', () => {
  expect(kanaWordToArray('しゅうしゅう')).toStrictEqual([
    'しゅ',
    'う',
    'しゅ',
    'う',
  ]);
});

test('numberPitch pitch has one more char than the kana expression', () => {
  numberPitch.forEach((element) => {
    expect(kanaWordToArray(element.kana).length + 1).toBe(element.pitch.length);
  });
});

test('concat pitch pattern of HLL, HLL, LHH, LHH is HL, HL, LH, HHH', () => {
  expect(concatPitchPattern(['HLL', 'HLL', 'LHH', 'LHH'])).toStrictEqual([
    'HL',
    'HL',
    'LH',
    'LHH',
  ]);
  expect(concatPitchPattern(['HLL', 'HLL', 'LHH', 'LHH'], true)).toStrictEqual([
    'HL',
    'HL',
    'LH',
    'HHH',
  ]);
});

test('word pitch array to pitch remove last pitch of all wordPitch except last element', () => {
  expect(
    wordPitchArrayToPitchPattern([
      {
        word: '500',
        kana: 'ごひゃく',
        pitch: 'LHHL',
        wType: [WordType.Number100],
      },
      {
        word: '90',
        kana: 'きゅうじゅう',
        pitch: 'HLLLL',
        wType: [WordType.Number10],
      },
      {
        word: '9',
        wordAlt: '九',
        kana: 'きゅう',
        pitch: 'HLL',
        wType: [WordType.Number],
      },
    ])
  ).toStrictEqual(['LHH', 'HLLL', 'HLL']);
});

test('87524 gives 80000, 7000, 500, 20, 4', () => {
  expect(numberToArrayOfPoweredWordString(87524)).toStrictEqual([
    '80000',
    '7000',
    '500',
    '20',
    '4',
  ]);
});

test('87524 to kanji array is proper', () => {
  expect(numberToArrayOfKanji(87524)).toStrictEqual([
    '八',
    '万',
    '七',
    '千',
    '五',
    '百',
    '二',
    '十',
    '四',
  ]);
});
test('200087524 to kanji array is proper', () => {
  expect(numberToArrayOfKanji(200087524)).toStrictEqual([
    '二',
    '億',
    '八',
    '万',
    '七',
    '千',
    '五',
    '百',
    '二',
    '十',
    '四',
  ]);
});
test('1000000 to kanji array is proper', () => {
  expect(numberToArrayOfKanji(1000000)).toStrictEqual(['百', '万']);
});
test('10000 to kanji array is proper', () => {
  expect(numberToArrayOfKanji(10000)).toStrictEqual(['一', '万']);
});
test('100000000 to kanji array is proper', () => {
  expect(numberToArrayOfKanji(100000000)).toStrictEqual(['一', '億']);
});
test('100 to kanji array is proper', () => {
  expect(numberToArrayOfKanji(100)).toStrictEqual(['百']);
});
test('1050000 to kanji array is proper', () => {
  expect(numberToArrayOfKanji(1050000)).toStrictEqual(['百', '五', '万']);
});
test('1050020 to kanji array is proper', () => {
  expect(numberToArrayOfKanji(1050020)).toStrictEqual([
    '百',
    '五',
    '万',
    '二',
    '十',
  ]);
});
test('0 to kanji array is proper', () => {
  expect(numberToArrayOfKanji(0)).toStrictEqual(['零']);
});
test('1 to kanji array is proper', () => {
  expect(numberToArrayOfKanji(1)).toStrictEqual(['一']);
});
test('2 to kanji array is proper', () => {
  expect(numberToArrayOfKanji(2)).toStrictEqual(['二']);
});

test('2344 results in the good number pitch array', () => {
  expect(
    kanjiArrayToArrayOfNumberPitch([
      '二',
      '千',
      '三',
      '百',
      '四',
      '十',
      '四',
    ]).map((value) => value.wordAlt)
  ).toStrictEqual(['二', '千', '三百', '四十', '四']);
});
test('100320020 results in the good number pitch array', () => {
  expect(
    kanjiArrayToArrayOfNumberPitch([
      '一',
      '億',
      '三',
      '十',
      '二',
      '万',
      '二',
      '十',
    ]).map((value) => value.wordAlt)
  ).toStrictEqual(['一', '億', '三十', '二', '万', '二十']);
});
