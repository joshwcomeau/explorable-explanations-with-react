// @flow
import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';

import { SPRING_SETTINGS } from '../../constants';
import {
  convertTimeElapsedToCycle,
  getPointsForWaveform,
  applyWaveformAddition,
  createSVGPathFromWaveformPoints,
  translateAxisRelativeYValue,
} from '../../helpers/waveform.helpers';

import type { WaveformPoint, WaveformShape } from '../../types';

type Props = {
  shape: WaveformShape,
  width: number,
  height: number,
  // frequency is the number of cycles to squeeze into this waveform
  // visualization. The default value of `1` means that a single iteration of
  // the waveform is drawn. `2` means that the cycle is rendered twice, etc
  frequency: number,
  // Amplitude is the strength of the waveform (AKA loudness, volume).
  // it can range from 0 to 1, and affects how 'tall' the waveform is.
  amplitude: number,
  // progress is the number of cycles, based on `frequency`, that have elapsed
  progress?: number,
  children: (points: Array<WaveformPoint>) => any,
};

class WaveformCalculator extends PureComponent {
  static defaultProps = {
    shape: 'sine',
    frequency: 1,
    amplitude: 1,
    progress: 0,
  };

  render() {
    const { children, ...waveformData } = this.props;

    const points = getPointsForWaveform(waveformData);

    // React Motion takes a map-like object:
    // { opacity: 10, translate: -10 }
    //
    // In our case, we have an array of coordinates:
    // [{ x: 0, y: 100 }, { x: 2, y: 110 }, ...]
    //
    // We need to transform our array of data into something that
    // React Motion can understand:
    // { '0': 100, '2': 110, ...}
    const motionInput = points.reduce((acc, { x, y }) => {
      acc[x] = spring(y, SPRING_SETTINGS);
      return acc;
    }, {});

    return (
      <Motion style={motionInput}>
        {pointsObject => {
          // Now, we need to undo the transformation that was required to
          // satisfy React Motion. The reverse of before.
          // from: { '0': 100, '2': 110, ...}
          // back to: [{ x: 0, y: 100 }, { x: 2, y: 110 }, ...]
          const reconstitutedPoints = Object.entries(pointsObject).map(
            ([x, y]) => ({
              x,
              y,
            })
          );

          return children(reconstitutedPoints);
        }}
      </Motion>
    );
  }
}

export default WaveformCalculator;
