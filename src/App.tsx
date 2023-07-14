import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { PitchDisplay } from './components/PitchDisplay/PitchDisplay';
import { NumberPitch, WordPitch } from './model/wordPitch';
import PitchDiagram from './components/AlternatePitchDisplay/AltPitchDisplay';
import { PitchAccentService } from './services/PitchAccent.service';
import { PitchTester } from './components/PitchTester/PitchTester';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [wordPitches, setWordPitches] = useState<(WordPitch | NumberPitch)[]>([]);
  const [pitchAccentService, setPitchAccentService] = useState<PitchAccentService>(
    new PitchAccentService()
  );
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setShow(true);
    });
  }, []);

  useEffect(() => {
    if (!pitchAccentService) {
      setPitchAccentService(new PitchAccentService());
    }
  }, [pitchAccentService]);

  const onClickButton = () => {
    if (inputRef.current && inputRef.current.value) {
      const wordPitch = pitchAccentService.computePitchAccent(Number(inputRef.current.value));
      setWordPitches(wordPitch);
    }
  };

  return (
    <div className="App">
      {show && (
        <div className="App-header">
          <PitchTester></PitchTester>
          <div className="setup">
            <input
              ref={inputRef}
              type="number"
              name="text"
              className="input"
              placeholder="Type here..."
            />
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
      )}
    </div>
  );
}

export default App;
