// @flow
import React, { Component } from 'react';

import {
  convertProgressToCycle,
  getPointsForWaveform,
  createSVGPathFromWaveformPoints,
  translateAxisRelativeYValue,
} from '../../helpers/waveform.helpers';

type Props = {
  shape: 'sine' | 'triangle' | 'square' | 'sawtooth',
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
};

class WaveformCalculator extends Component {
  static defaultProps = {
    shape: 'sine',
    progress: 0,
  };

  render() {
    const {
      width,
      height,
      shape,
      frequency,
      amplitude,
      progress,
      children,
    } = this.props;

    const offset = convertProgressToCycle(progress);

    const points = getPointsForWaveform({
      shape,
      frequency,
      amplitude,
      width,
      height,
      offset,
    });

    return children(points);
  }
}

export default WaveformCalculator;
