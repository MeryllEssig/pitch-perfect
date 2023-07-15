import { Counters } from '../data/wordPitch';
import { NumberPitch, WordPitch } from '../model/wordPitch';
import { BehaviorStrategy } from '../utilities/PitchStrategy/ConcretePitchStrategies/BehaviorStrategy.all';
import { CommonStrategy } from '../utilities/PitchStrategy/ConcretePitchStrategies/CommonStrategy.counter';
import { CutStrategy } from '../utilities/PitchStrategy/ConcretePitchStrategies/CutStrategy.all';
import { HeibanChainStrategy } from '../utilities/PitchStrategy/ConcretePitchStrategies/HeibanChainStrategy.all';
import { JuuStrategy } from '../utilities/PitchStrategy/ConcretePitchStrategies/JuuStrategy.num';
import { SenManStrategy } from '../utilities/PitchStrategy/ConcretePitchStrategies/SenManStrategy.num';
import { TrailingAccented10Strategy } from '../utilities/PitchStrategy/ConcretePitchStrategies/TrailingAccented10Strategy.num';
import { PitchStrategyManager } from '../utilities/PitchStrategy/PitchStategyManager';
import { kanjiArrayToArrayOfNumberPitch, numberToArrayOfKanji } from '../utilities/word';

export class PitchAccentService {
  // Each phase determines an order of priority for rules to apply. All words will pass phase 1 first, then again with 2, etc..
  private _firstPhasePitchStrategyManager: PitchStrategyManager;
  private _secondPhasePitchStrategyManager: PitchStrategyManager;
  private _thirdPhasePitchStrategyManager: PitchStrategyManager;
  private _fourthPhasePitchStrategyManager: PitchStrategyManager;

  constructor() {
    // Create PitchStrategyManager and add all the pitch strategies
    this._firstPhasePitchStrategyManager = new PitchStrategyManager();
    this._firstPhasePitchStrategyManager.registerPitchStrategy(new SenManStrategy());
    this._firstPhasePitchStrategyManager.registerPitchStrategy(new TrailingAccented10Strategy());
    this._firstPhasePitchStrategyManager.registerPitchStrategy(new JuuStrategy());

    this._secondPhasePitchStrategyManager = new PitchStrategyManager();
    this._secondPhasePitchStrategyManager.registerPitchStrategy(new HeibanChainStrategy());
    this._secondPhasePitchStrategyManager.registerPitchStrategy(new BehaviorStrategy());
    // Put the counter strategy here (because number っ pre-counter transform does not become Odaka but Nakadaka)

    this._thirdPhasePitchStrategyManager = new PitchStrategyManager();
    this._thirdPhasePitchStrategyManager.registerPitchStrategy(new CommonStrategy());

    this._fourthPhasePitchStrategyManager = new PitchStrategyManager();
    this._fourthPhasePitchStrategyManager.registerPitchStrategy(new CutStrategy());
  }

  getPitchStrategyManager(): PitchStrategyManager {
    return this._firstPhasePitchStrategyManager;
  }

  computePitchAccent(num: number, counterSelected = ''): (WordPitch | NumberPitch)[] {
    // For each char depending of its position, compute the japanese word
    const numberKanjis = numberToArrayOfKanji(num);
    const numberPitches: (WordPitch | NumberPitch)[] = kanjiArrayToArrayOfNumberPitch(numberKanjis);
    if (counterSelected) {
      const counterPitch = Counters.find(counter => counter.word === counterSelected);
      if (counterPitch) {
        numberPitches.push(counterPitch);
      }
    }
    const newNumberPitches: (WordPitch | NumberPitch)[] = [];
    // Apply the rules using word data
    for (let i = 0; i < numberPitches.length; i++) {
      const prevPrevWord = numberPitches[i - 2] || null;
      const prevWord = numberPitches[i - 1] || null;
      const numWord = numberPitches[i];
      const nextWord = numberPitches[i + 1] || null;
      const nextNextWord = numberPitches[i + 2] || null;

      newNumberPitches.push(
        this._firstPhasePitchStrategyManager.applyPitchStrategy(
          prevPrevWord,
          prevWord,
          structuredClone(numWord),
          nextWord,
          nextNextWord
        ) as NumberPitch
      );
    }

    for (let i = 0; i < newNumberPitches.length; i++) {
      const prevPrevWord = newNumberPitches[i - 2] || null;
      const prevWord = newNumberPitches[i - 1] || null;
      const numWord = newNumberPitches[i];
      const nextWord = newNumberPitches[i + 1] || null;
      const nextNextWord = newNumberPitches[i + 2] || null;

      newNumberPitches[i] = this._secondPhasePitchStrategyManager.applyPitchStrategy(
        prevPrevWord,
        prevWord,
        structuredClone(numWord),
        nextWord,
        nextNextWord
      ) as NumberPitch;
    }
    for (let i = 0; i < newNumberPitches.length; i++) {
      const prevPrevWord = newNumberPitches[i - 2] || null;
      const prevWord = newNumberPitches[i - 1] || null;
      const numWord = newNumberPitches[i];
      const nextWord = newNumberPitches[i + 1] || null;
      const nextNextWord = newNumberPitches[i + 2] || null;

      newNumberPitches[i] = this._thirdPhasePitchStrategyManager.applyPitchStrategy(
        prevPrevWord,
        prevWord,
        structuredClone(numWord),
        nextWord,
        nextNextWord
      ) as NumberPitch;
    }
    for (let i = 0; i < newNumberPitches.length; i++) {
      const prevPrevWord = newNumberPitches[i - 2] || null;
      const prevWord = newNumberPitches[i - 1] || null;
      const numWord = newNumberPitches[i];
      const nextWord = newNumberPitches[i + 1] || null;
      const nextNextWord = newNumberPitches[i + 2] || null;

      newNumberPitches[i] = this._fourthPhasePitchStrategyManager.applyPitchStrategy(
        prevPrevWord,
        prevWord,
        structuredClone(numWord),
        nextWord,
        nextNextWord
      ) as NumberPitch;
    }

    return newNumberPitches;
  }
}
