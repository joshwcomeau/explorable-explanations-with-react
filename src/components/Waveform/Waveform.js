import React, { Component } from 'react';
import { Spring } from 'react-spring';

import {
  getPointsForWaveform,
  convertPointsToPath,
} from '../../helpers/waveform.helpers';

class Waveform extends Component {
  render() {
    const {
      width,
      height,
      shape,
      frequency,
      amplitude,
      timeElapsed,
      color,
      strokeWidth,
    } = this.props;

    return (
      <Spring to={{ amplitude, frequency, timeElapsed }}>
        {({ amplitude, frequency, timeElapsed }) => {
          const points = getPointsForWaveform({
            shape,
            frequency,
            amplitude,
            timeElapsed,
            width,
            height,
          });

          const svgPath = convertPointsToPath(points);

          return (
            <svg width={width} height={height} style={{ overflow: 'visible' }}>
              <path
                d={svgPath}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
              />
            </svg>
          );
        }}
      </Spring>
    );
  }
}

export default Waveform;
