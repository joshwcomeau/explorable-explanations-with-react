// @flow
import React, { PureComponent } from 'react';
import { Spring } from 'react-spring';

import {
  getPointsForWaveform,
  applyWaveformAddition,
} from '../../helpers/waveform.helpers';

import type { WaveformPoint, WaveformShape } from '../../types';

type Props = {
  shape: WaveformShape,
  width: number,
  height: number,
  frequency: number,
  amplitude: number,
  timeElapsed: number,
  children: (points: Array<WaveformPoint>) => any,
};

type State = {
  tweenFrom: WaveformShape,
  justChangedShape: false,
};

class PointsCalculator extends PureComponent<Props, State> {
  state = {
    tweenFrom: this.props.shape,
    justChangedShape: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.shape !== this.props.shape) {
      this.setState(
        {
          tweenFrom: prevProps.shape,
          reset: true,
        },
        () => {
          this.setState({
            reset: false,
          });
        }
      );
    }
  }

  render() {
    const { children, shape, amplitude, frequency, width, height } = this.props;
    const { tweenFrom, justChangedShape } = this.state;

    return (
      <Spring
        reset={justChangedShape}
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
        {({ tweenAmount, amplitude, frequency }) => {
          const points = applyWaveformAddition(
            getPointsForWaveform({
              shape,
              amplitude,
              frequency,
              width,
              height,
              shape: tweenFrom,
            }),
            [
              getPointsForWaveform({
                shape,
                amplitude,
                frequency,
                width,
                height,
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

export default PointsCalculator;
