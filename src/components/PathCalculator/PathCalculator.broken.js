// @flow
import React, { PureComponent } from 'react';
import { Spring } from 'react-spring';

import {
  getPointsForWaveform,
  convertPointsToPath,
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
};

class PathCalculator extends PureComponent<Props, State> {
  state = {
    tweenFrom: this.props.shape,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.shape !== this.props.shape) {
      this.setState({ tweenFrom: prevProps.shape });
    }
  }

  render() {
    const {
      children,
      shape,
      amplitude,
      frequency,
      timeElapsed,
      width,
      height,
    } = this.props;
    const { tweenFrom, justChangedShape } = this.state;

    return (
      <Spring
        reset={justChangedShape}
        from={{
          amplitude,
          frequency,
          ratio: 0,
        }}
        to={{
          amplitude,
          frequency,
          ratio: 1,
        }}
      >
        {({ amplitude, frequency, ratio }) => {
          const points = applyWaveformAddition(
            getPointsForWaveform({
              shape,
              amplitude,
              frequency,
              width,
              height,
              timeElapsed,
              shape: tweenFrom,
            }),
            [
              getPointsForWaveform({
                shape,
                amplitude,
                frequency,
                width,
                height,
                timeElapsed,
                shape: this.props.shape,
              }),
            ],
            ratio
          );

          const definition = convertPointsToPath(points);

          return children(definition);
        }}
      </Spring>
    );
  }
}

export default PathCalculator;
