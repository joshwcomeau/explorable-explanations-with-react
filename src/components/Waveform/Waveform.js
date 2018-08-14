import React, { Component } from 'react';
import { Spring } from 'react-spring';

import { COLORS } from '../../constants';

import PathCalculator from '../PathCalculator';
import BrokenPathCalculator from '../PathCalculator/PathCalculator.broken';

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
      useBrokenCalculator,
    } = this.props;

    const CalculatorComponent = useBrokenCalculator
      ? BrokenPathCalculator
      : PathCalculator;

    return (
      <CalculatorComponent
        shape={shape}
        amplitude={amplitude}
        frequency={frequency}
        timeElapsed={timeElapsed}
        width={width}
        height={height}
      >
        {definition => (
          <svg width={width} height={height} style={{ overflow: 'visible' }}>
            <path
              d={definition}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
            />
          </svg>
        )}
      </CalculatorComponent>
    );
  }
}

export default Waveform;
