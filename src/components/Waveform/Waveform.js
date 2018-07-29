// @flow
import React, { Component } from 'react';

import { createSVGPathFromWaveformPoints } from '../../helpers/waveform.helpers';

export type Props = {
  points?: Array<WaveformPoint>,
  width: number,
  height: number,

  // Line color for the waveform line.
  color: string,
  strokeWidth: number,
  strokeLinecap: Linecap,
  opacity: number,
};

class Waveform extends Component<Props> {
  static defaultProps = {
    width: 200,
    height: 100,
    color: 'black',
    strokeWidth: 5,
    strokeLinecap: 'round',
    opacity: 1,
    points: [],
  };

  render() {
    const {
      points,
      width,
      height,
      color,
      strokeWidth,
      strokeLinecap,
      opacity,
    } = this.props;

    const svgPath = createSVGPathFromWaveformPoints(
      points,
      height
    );

    return (
      <svg
        width={width}
        height={height}
        style={{ overflow: 'visible' }}
      >
        <path
          d={svgPath}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          fill="none"
          style={{
            opacity,
            transition: 'opacity 500ms',
          }}
        />
      </svg>
    );
  }
}

export default Waveform;
