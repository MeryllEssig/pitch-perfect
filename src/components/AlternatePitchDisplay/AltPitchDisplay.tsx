import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, Dot, Text } from 'recharts';

// import hatsuon from 'hatsuon';
// import { getPitchPatternName } from 'hatsuon/dist/utils';
import './PitchDisplay.css';
import { kanaWordToArray } from '../../utilities/word';
import { ImplicitLabelType } from 'recharts/types/component/Label';

PitchDiagram.propTypes = {
  reading: PropTypes.string,
  pitchNum: PropTypes.number,
  showMora: PropTypes.bool,
  showLabel: PropTypes.bool,
  colors: PropTypes.shape({
    平板: PropTypes.string,
    頭高: PropTypes.string,
    中高: PropTypes.string,
    尾高: PropTypes.string,
    不詳: PropTypes.string,
  }),
};

PitchDiagram.defaultProps = {
  reading: '',
  pitchNum: -1,
  showMora: true,
  showLabel: false,
  colors: {
    平板: '#d20ca3',
    頭高: '#ea9316',
    中高: '#27a2ff',
    尾高: '#0cd24d',
    不詳: '#cccccc',
  },
};

const COLORS = {
  placeholder: '#bababa',
  white: '#fff',
};

const placeholder = '（ツ）';
const placeholderMorae = ['', '', '', placeholder, '', '', ''];
const placeholderData = [
  { name: '', pitchHeight: 1 },
  { name: '', pitchHeight: 1 },
  { name: '', pitchHeight: 0 },
  { name: '', pitchHeight: 0 },
  { name: '', pitchHeight: 0 },
  { name: '', pitchHeight: 1 },
  { name: '', pitchHeight: 1 },
];

function getMoraLabel(
  morae: string[],
  { x, y, stroke, index }: any
): JSX.Element {
  const label = morae[index];
  const isPlaceholder = label === placeholder;
  return (
    <Text
      x={x}
      y={y - 2}
      dy={isPlaceholder ? -11 : -8}
      fill={isPlaceholder ? COLORS.placeholder : stroke}
      fontSize={isPlaceholder ? 20 : 12}
      textAnchor="middle"
    >
      {label}
    </Text>
  );
}

type Props = {
  reading: string;
  pitchNum: number;
  showMora: boolean;
  showLabel: boolean;
  colors: { [key: string]: string };
};

/*
hatsuon({ reading: 'ちゅうがっこう', pitchNum: 3 });
// =>
{
  reading: 'ちゅうがっこう',
  pitchNum: 3,
  morae: ['ちゅ', 'う', 'が', 'っ', 'こ', 'う'],
  // low, high, high, low, low, low, low*
  // *following particle (は、が, の etc) pitch
  pattern: [0, 1, 1, 0, 0, 0, 0],
  patternName: '中高', // nakadaka
}

*/

function PitchDiagram({
  reading,
  pitchNum,
  showMora,
  showLabel,
  colors,
}: Props) {
  let morae = kanaWordToArray(reading);
  const pattern = [0, 1, 1, 1, 0, 0, 0];
  let patternName = '中高';
  //   let { morae, pattern, patternName } = { word read};
  let moraCount = morae.length;
  let data = [];
  const color = colors[patternName];
  //   let patternNameEn = getPitchPatternName(morae.length, pitchNum, 'EN');

  if (pitchNum !== -1 && pattern.length) {
    data = pattern.map((pitch, i, pattern) => ({
      name: i === pattern.length - 1 ? 'particle' : `${morae[i]}`,
      pitchHeight: pitch,
    }));
  } else {
    morae = placeholderMorae;
    data = placeholderData;
    moraCount = 5;
    patternName = '不詳';
    // color = colors['不詳'];
    // patternNameEn = 'unknown';
  }
  return (
    <div className="pd-wrapper">
      <LineChart
        width={(moraCount + 1) * 22}
        height={pitchNum < 0 ? 55 : 50}
        data={data}
        margin={{
          top: 20,
          right: 10,
          bottom: 10,
          left: 10,
        }}
        // {...rest}
      >
        <Line
          isAnimationActive={false}
          dataKey="pitchHeight"
          label={(props) => getMoraLabel(morae, props)}
          stroke={color}
          strokeWidth={2}
          dot={(dot) => (
            <Dot
              {...dot}
              fill={dot.payload.name === 'particle' ? COLORS.white : color}
            />
          )}
        />
      </LineChart>
      {showLabel && (
        <div className="pd-label">
          <span lang="ja">{patternName} </span>
          {/* <small>({patternNameEn})</small> */}
        </div>
      )}
    </div>
  );
}

export default PitchDiagram;

// WEBPACK FOOTER //
// ./src/PitchPattern.js
