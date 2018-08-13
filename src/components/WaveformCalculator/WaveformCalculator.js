// @flow
import React, { PureComponent } from 'react';
import { Spring } from 'react-spring';

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
    tweenFrom: this.props.shape,
    reset: false,
  };

  static defaultProps = {
    shape: 'sine',
    frequency: 1,
    amplitude: 1,
    progress: 0,
    pixelRatio: 5,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.shape !== this.props.shape) {
      this.setState({
        tweenFrom: prevProps.shape,
        reset: true,
      }, () => {
        this.setState({
          reset: false,
        })
      })
    }
  }

  render() {
    const {
      children,
      animateAmplitudeAndFrequency,
      ...waveformData
    } = this.props;
    const {
      tweenFrom,
      reset,
    } = this.state;

    return (
      <Spring
        reset={reset}
        immediate={!animateAmplitudeAndFrequency}
        from={{
          amplitude: waveformData.amplitude,
          frequency: waveformData.frequency,
          tweenAmount: 0,
        }}
        to={{
          amplitude: waveformData.amplitude,
          frequency: waveformData.frequency,
          tweenAmount: 1,
        }}
      >
        {({tweenAmount, amplitude, frequency}) => {
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
                shape: this.props.shape,
              }),
            ],
            tweenAmount
          );

          return children(points);
        }}
      </Spring>
    );
  }
}

export default WaveformCalculator;
