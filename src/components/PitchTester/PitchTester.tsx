import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './PitchTester.css';
import { PitchDisplay } from '../PitchDisplay/PitchDisplay';
import { NumberPitch, WordPitch } from '../../model/wordPitch';
import PitchDiagram from '../AlternatePitchDisplay/AltPitchDisplay';
import { PitchAccentService } from '../../services/PitchAccent.service';
import { Counters } from '../../data/wordPitch';

const Numbers = [
  -1, 1, 3, 4, 12, 13, 14, 15, 20, 21, 23, 26, 33, 37, 45, 54, 57, 58, 84, 99, 100, 101, 102, 151,
  184, 251, 304, 356, 1000, 1001, 1010, 1015, 2020, 2549, 2337, 10000, 10001, 10010, 10011, 10100,
  10101, 10110, 10111, 11000, 11001, 11010,
];

export function PitchTester() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [wordPitches, setWordPitches] = useState<(WordPitch | NumberPitch)[]>([]);
  const [pitchAccentService, setPitchAccentService] = useState<PitchAccentService>(
    new PitchAccentService()
  );

  const [numberSelected, setNumberSelected] = useState<number>(0);
  const [counterSelected, setCounterSelected] = useState<string>('');

  useEffect(() => {
    if (!pitchAccentService) {
      setPitchAccentService(new PitchAccentService());
    }
  }, [pitchAccentService]);

  const onClickButton = () => {
    if (counterSelected === '') {
      const wordPitch = pitchAccentService.computePitchAccent(numberSelected);
      console.log(wordPitch);
      setWordPitches(wordPitch);
    } else {
      const wordPitch = pitchAccentService.computePitchAccent(numberSelected, counterSelected);
      console.log(wordPitch);
      setWordPitches(wordPitch);
    }
  };

  return (
    <div className="PitchTester">
      <div className="PitchTester__selectors">
        <div className="PitchTester__number-selectors">
          {Numbers.map((number, index) => {
            return (
              <button key={index} onClick={() => setNumberSelected(number)} className="btn-choice">
                {number === -1 ? '何' : number}
              </button>
            );
          })}
        </div>
        <div className="PitchTester__counter-selectors">
          <button onClick={() => setCounterSelected('')} className="btn-choice">
            None
          </button>
          {Counters.map((counter, index) => {
            return (
              <button
                key={index}
                onClick={() => setCounterSelected(counter.word)}
                className="btn-choice">
                {counter.word}
              </button>
            );
          })}
        </div>
      </div>

      <div className="PitchTester__current-choice">
        {numberSelected === -1 ? '何' : numberSelected}
        {counterSelected}
      </div>

      <div className="setup">
        {/* <input
          ref={inputRef}
          type="number"
          name="text"
          className="input"
          placeholder="Type here..."
        /> */}
        <button onClick={onClickButton} className="lol-button">
          <span className="shadow"></span>
          <span className="edge"></span>
          <span className="front text"> Compute pitch</span>
        </button>
      </div>
      <div className="pitch-container">
        <PitchDisplay wordPitches={wordPitches}></PitchDisplay>
      </div>
    </div>
  );
}
