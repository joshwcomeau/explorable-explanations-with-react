// @flow
import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';

import { SPRING_SETTINGS } from '../../constants';
import {
  convertProgressToCycle,
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
  // Progress is the number of seconds that have passed since the animation
  // started. It can be used to derive the "offset", a value from 0 to 99
  // that represents where in the phase this wave starts from.
  progress?: number,
  children: (points: Array<WaveformPoint>) => any,
};

type State = {
  isTweening: boolean,
  tweenFromShape: WaveformShape,
  tweenFromPoints: ?Array<WaveformPoint>,
};

class WaveformCalculator extends PureComponent {
  state = {
    isTweening: false,
    tweenFromPoints: getPointsForWaveform(this.props),
    tweenToShape: this.props.shape,
  };

  static defaultProps = {
    shape: 'sine',
    progress: 0,
  };

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.shape !== nextProps.shape) {
      // This component will always think about things in terms of "fromPoints"
      // and "toShape". The reason for this discrepancy is that I want this to
      // be interruptible, and so if the wave is halfway between a sine and saw
      // when it moves to triangle, I need to start a new transition from this
      // mid-point.
      this.setState({
        isTweening: true,
        tweenFromPoints: getPointsForWaveform(this.props),
        tweenToShape: nextProps.shape,
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
      progress,
      children,
    } = this.props;
    const { isTweening, tweenFromPoints, tweenToShape } = this.state;

    const tweenAmount = isTweening ? spring(1, SPRING_SETTINGS) : 0;

    const offset = convertProgressToCycle(progress);

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
          const waveformProps = {
            width,
            height,
            frequency,
            amplitude,
            progress,
            offset,
          };

          const points = applyWaveformAddition(
            tweenFromPoints,
            [
              getPointsForWaveform({
                shape,
                ...waveformProps,
              }),
            ],
            tweenAmount
          );

          return children(points);
        }}
      </Motion>
    );
  }
}

export default WaveformCalculator;
