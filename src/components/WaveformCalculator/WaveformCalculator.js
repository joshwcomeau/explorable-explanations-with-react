// @flow
import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';

import { SPRING_SETTINGS } from '../../constants';
import {
  getPointsForWaveform,
  applyWaveformAddition,
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
  // Props specifically for this demo
  animateAmplitudeAndFrequency: boolean,
  pixelRatio: number,
};

type State = {
  tweenCount: number,
  tweenFrom: WaveformShape,
  tweenTo: WaveformShape,
};

const SHAPE_MAP = {};

class WaveformCalculator extends PureComponent {
  state = {
    tweenCount: 0,
    tweenFrom: this.props.shape,
    tweenTo: this.props.shape,
  };

  static defaultProps = {
    shape: 'sine',
    frequency: 1,
    amplitude: 1,
    progress: 0,
    pixelRatio: 5,
  };

  static getDerivedStateFromProps(
    nextProps,
    prevState
  ) {
    if (nextProps.shape !== prevState.tweenTo) {
      return {
        tweenCount: prevState.tweenCount + 1,
        tweenFrom: prevState.tweenTo,
        tweenTo: nextProps.shape,
      };
    }

    return null;
  }

  render() {
    const {
      children,
      animateAmplitudeAndFrequency,
      ...waveformData
    } = this.props;
    const {
      tweenCount,
      tweenFrom,
      tweenTo,
    } = this.state;

    const tweenAmount = spring(
      tweenCount % 2,
      SPRING_SETTINGS
    );

    const amplitude = animateAmplitudeAndFrequency
      ? spring(waveformData.amplitude)
      : waveformData.amplitude;
    const frequency = animateAmplitudeAndFrequency
      ? spring(waveformData.frequency)
      : waveformData.frequency;

    return (
      <Motion
        style={{
          tweenAmount,
          amplitude,
          frequency,
        }}
      >
        {({
          tweenAmount,
          amplitude,
          frequency,
        }) => {
          const points = applyWaveformAddition(
            getPointsForWaveform({
              ...waveformData,
              amplitude,
              frequency,
              shape: tweenFrom,
            }),
            [
              getPointsForWaveform({
                ...waveformData,
                amplitude,
                frequency,
                shape: tweenTo,
              }),
            ],
            tweenCount % 2 !== 0
              ? tweenAmount
              : 1 - tweenAmount
          );

          return children(points);
        }}
      </Motion>
    );
  }
}

export default WaveformCalculator;
