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

type State = {
  tweenCount: number,
  tweenFromShape: WaveformShape,
};

class WaveformCalculator extends PureComponent {
  state = {
    tweenCount: 0,
    tweenFromShape: this.props.shape,
  };

  static defaultProps = {
    shape: 'sine',
    frequency: 1,
    amplitude: 1,
    progress: 0,
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (this.props.shape !== nextProps.shape) {
      this.setState({
        tweenCount: this.state.tweenCount + 1,
        tweenFromShape: this.props.shape,
      });
    }
  }

  render() {
    const { children, ...waveformData } = this.props;
    const { tweenCount, tweenFromShape } = this.state;

    const tweenAmount = spring(tweenCount % 2, SPRING_SETTINGS);

    return (
      <Motion style={{ tweenAmount }}>
        {({ tweenAmount }) => {
          const points = applyWaveformAddition(
            getPointsForWaveform({
              ...waveformData,
              shape: tweenFromShape,
            }),
            [getPointsForWaveform(waveformData)],
            tweenCount % 2 !== 0 ? tweenAmount : 1 - tweenAmount
          );

          return children(points);
        }}
      </Motion>
    );
  }
}

export default WaveformCalculator;
