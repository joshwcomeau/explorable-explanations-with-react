import React, { Component } from 'react';
import { Spring } from 'react-spring';

import {
  getPointsForWaveform,
  convertPointsToPath,
} from '../../helpers/waveform.helpers';
import { COLORS } from '../../constants';

class Waveform extends Component {
  static defaultProps = {
    shape: 'sine',
    strokeWidth: 4,
    color: COLORS.blue[700],
  };

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
      <Spring to={{ amplitude, frequency }}>
        {({ amplitude, frequency }) => {
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
