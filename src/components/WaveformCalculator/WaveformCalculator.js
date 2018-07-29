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

import type {
  WaveformPoint,
  WaveformShape,
} from '../../types';

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
  isTweening: boolean,
  tweenFromShape: WaveformShape,
};

class WaveformCalculator extends PureComponent {
  state = {
    isTweening: false,
    tweenFromShape: this.props.shape,
  };

  static defaultProps = {
    shape: 'sine',
    frequency: 1,
    amplitude: 1,
    progress: 0,
  };

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.shape !== nextProps.shape) {
      this.setState({
        isTweening: true,
        tweenFromShape: this.props.shape,
      });
    }
  }

  render() {
    const {
      width,
      height,
      shape,
      frequency,
      amplitude,
      children,
    } = this.props;
    const {
      isTweening,
      tweenFromPoints,
      tweenToShape,
    } = this.state;

    const tweenAmount = isTweening
      ? spring(1, SPRING_SETTINGS)
      : 0;

    return (
      <Motion
        style={{ tweenAmount }}
        onRest={() =>
          this.setState({
            isTweening: false,
          })
        }
      >
        {({ tweenAmount }) => {
          const points = applyWaveformAddition(
            getPointsForWaveform({
              ...this.props,
              shape: this.state.tweenFromShape,
            }),
            [getPointsForWaveform(this.props)],
            tweenAmount
          );

          return children(points);
        }}
      </Motion>
    );
  }
}

export default WaveformCalculator;
