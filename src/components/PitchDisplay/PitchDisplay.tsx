import React, { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Dot,
  LabelList,
  Line,
  LineChart,
  Rectangle,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Text,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import { NumberPitch, WordPitch } from '../../model/wordPitch';
import { kanaWordToArray } from '../../utilities/word';
import '../AlternatePitchDisplay/PitchDisplay.css';
// const data = [
//   { x: 0, y: 0, z: 'ちゅ' },
//   { x: 10, y: 40, z: 'う' },
//   { x: 20, y: 40, z: 'が' },
//   { x: 30, y: 40, z: 'っ' },
//   { x: 40, y: 40, z: 'こ' },
//   { x: 50, y: 0, z: 'う' },
//   { x: 60, y: 0, z: 'は' },
//   { x: 70, y: 40, z: 'が' },
//   { x: 80, y: 40, z: 'っ' },
//   { x: 90, y: 40, z: 'こ' },
//   { x: 100, y: 40, z: 'が' },
//   { x: 110, y: 40, z: 'っ' },
//   { x: 120, y: 40, z: 'こ' },
// ];

function getMoraLabel(
  morae: { pitchHeight: number; name: string }[],
  { x, y, stroke, index }: any
): JSX.Element {
  const label = morae[index].name;
  // const isPlaceholder = label === placeholder;
  return (
    <Text x={x} y={82} dy={-8} fill={stroke} fontSize={12} textAnchor="middle">
      {label === 'particle' ? '' : label}
    </Text>
  );
}

export type PitchDisplayProps = {
  wordPitches: (NumberPitch | WordPitch)[];
};

export function PitchDisplay({ wordPitches }: PitchDisplayProps) {
  const [data, setData] = useState<{ pitchHeight: number; name: string }[]>([]);

  useEffect(() => {
    const dataBuilt: { pitchHeight: number; name: string }[] = [];
    let currentPosition = 0;
    console.debug(wordPitches);
    wordPitches.forEach((wordPitch) => {
      wordPitch.pitch.split('').forEach((mora, idx) => {
        const correspondingKana =
          idx + 1 > kanaWordToArray(wordPitch.kana).length
            ? 'particle'
            : kanaWordToArray(wordPitch.kana)[idx];
        dataBuilt.push({
          name: correspondingKana,
          pitchHeight: mora === 'H' ? 6 : 2,
        });
        currentPosition += 10;
      });
    });
    setData(dataBuilt);
  }, [wordPitches]);

  return (
    <div className="pd-wrapper">
      <LineChart
        width={(data.length + 1) * 22}
        height={85}
        data={data}
        margin={{
          top: 10,
          right: 10,
          bottom: 20,
          left: 10,
        }}
      >
        {/* <XAxis type="number" tick={false} axisLine={false} dataKey="x" />
      <YAxis type="number" tick={false} axisLine={false} dataKey="y" /> */}
        {/* <ZAxis type="number" range={[100]} /> */}

        <Line
          // name="Pitch Accent Pattern"
          dataKey={'pitchHeight'}
          stroke={'#ff0000'}
          label={(props) => getMoraLabel(data, props)}
          strokeWidth={2}
          dot={(dot) => (
            <Dot
              {...dot}
              fill={dot.payload.name === 'particle' ? 'white' : '#ff0000'}
            />
          )}
        >
          {/* <LabelList
          dataKey="z"
          position="top"
          offset={20}
          content={(props) => {
            const { x, y, width, height, value } = props;
            return (
              <Text
                x={Number(x) - 10}
                y={150}
                fill="black"
                style={{
                  fontSize: '18px',
                  fontFamily: 'Noto Sans JP',
                  fontWeight: 500,
                }}
              >
                {value}
              </Text>
            );
          }}
        /> */}
        </Line>
      </LineChart>
    </div>
    // <ResponsiveContainer
    //   width={90 * data.length}
    //   height={
    //     [
    //       210, 210, 220, 220, 220, 220, 220, 220, 220, 220, 220, 220, 220, 220,
    //       220, 220, 220, 220, 220, 220, 220, 220, 220,
    //     ][data.length - 1]
    //   }
    // >
    //   <ScatterChart
    //     margin={{
    //       top: 20,
    //       right: 20,
    //       bottom: 100,
    //       left: 20,
    //     }}
    //   >
    //     <XAxis type="number" tick={false} axisLine={false} dataKey="x" />
    //     <YAxis type="number" tick={false} axisLine={false} dataKey="y" />
    //     {/* <ZAxis type="number" range={[100]} /> */}

    //     <Scatter
    //       name="Pitch Accent Pattern"
    //       data={data}
    //       line={{ stroke: 'black', strokeWidth: 4 }}
    //       shape={(props) => {
    //         const index = Number(props.key.match(/\d+/g)[0]);
    //         if (index + 1 === data.length) {
    //           return (
    //             <>
    //               <Dot r={12} cx={props.x + 5} cy={props.y + 5}></Dot>
    //               <Dot
    //                 r={7}
    //                 cx={props.x + 5}
    //                 cy={props.y + 5}
    //                 style={{ fill: 'white' }}
    //               ></Dot>
    //             </>
    //           );
    //         }
    //         return <Dot r={10} cx={props.x + 5} cy={props.y + 5}></Dot>;
    //       }}
    //     >
    //       <LabelList
    //         dataKey="z"
    //         position="top"
    //         offset={20}
    //         content={(props) => {
    //           const { x, y, width, height, value } = props;
    //           return (
    //             <Text
    //               x={Number(x) - 10}
    //               y={150}
    //               fill="black"
    //               style={{
    //                 fontSize: '18px',
    //                 fontFamily: 'Noto Sans JP',
    //                 fontWeight: 500,
    //               }}
    //             >
    //               {value}
    //             </Text>
    //           );
    //         }}
    //       />
    //     </Scatter>
    //   </ScatterChart>
    // </ResponsiveContainer>
  );
}
