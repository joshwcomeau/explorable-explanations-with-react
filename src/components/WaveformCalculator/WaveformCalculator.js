// @flow
import React, { PureComponent } from 'react';

import {
  convertProgressToCycle,
  getPointsForWaveform,
  createSVGPathFromWaveformPoints,
  translateAxisRelativeYValue,
} from '../../helpers/waveform.helpers';

type WaveformPoint = {
  x: number,
  y: number,
};

type Props = {
  shape: 'sine' | 'triangle' | 'square' | 'sawtooth',
  width: number,
  height: number,
  // frequency is the number of cycles to squeeze into this waveform
  // visualization. The default value of `1` means that a single iteration of
  // the waveform is drawn. `2` means that the cycle is rendered twice, etc
  frequency: number,
  // Amplitude is the strength of the waveform (AKA loudness, volume).
  // it can range from 0 to 1, and affects how 'tall' the waveform is.
  amplitude: number,
  // Progress is the number of seconds that have passed since the animation
  // started. It can be used to derive the "offset", a value from 0 to 99
  // that represents where in the phase this wave starts from.
  progress?: number,
  children: (points: Array<WaveformPoint>) => React$Node,
};

type State = {
  points: Array<WaveformPoint>,
};

class WaveformCalculator extends PureComponent {
  state = {
    points: [],
  };

  static defaultProps = {
    shape: 'sine',
    progress: 0,
  };

  static getDerivedStateFromProps = (nextProps: Props) => {
    const { width, height, shape, frequency, amplitude, progress } = nextProps;

    const offset = convertProgressToCycle(progress);

    const points = getPointsForWaveform({
      shape,
      frequency,
      amplitude,
      width,
      height,
      offset,
    });

    return { points };
  };

  render() {
    const { children } = this.props;
    const { points } = this.state;

    return children(points);
  }
}

export default WaveformCalculator;
