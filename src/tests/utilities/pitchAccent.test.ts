import { WordType } from '../../model/wordType';
import { computeCounterPitchAccent } from '../../utilities/pitchAccentOld';

describe('Pitch accent of', () => {
  test('true', () => {
    expect(1).toBe(1);
  });
  // test('13度 is HLLLLHLL', () => {
  //     expect(computeCounterPitchAccent(13, {
  //         word: '度',
  //         kana: 'ど',
  //         pitch: '',
  //         def: 'Temperature',
  //         wType: WordType.CommonCounter
  //     })).toBe('HLLLLHLL')
  // })
  // test('43431 is LHHLLHHLHLLLHLLLLHL', () => {
  //     expect(computeNumberPitchAccent(13)).toBe('LHHLLHHLHLLLHLLLLHL')
  // })

  // test('13 is HLLLL', () => {
  //     expect(computeNumberPitchAccent(13)).toBe(['HL', 'LLL'])
  // })
});
