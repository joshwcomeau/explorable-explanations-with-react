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
  // frequency is the number of cycles to squeeze into this waveform
  // visualization. The default value of `1` means that a single iteration of
  // the waveform is drawn. `2` means that the cycle is rendered twice, etc
  frequency: number,
  // Amplitude is the strength of the waveform (AKA loudness, volume).
  // it can range from 0 to 1, and affects how 'tall' the waveform is.
  amplitude: number,
  // At what point in the waveform should the drawing start?
  // By default, it starts at `0`, but any value between 0 and 99 can be
  // used.
  // This is useful for animating the waveform, by simply auto-incrementing
  // the value in a requestAnimationFrame loop!
  offset: number,
};

class Waveform extends Component<Props> {
  static defaultProps = {
    width: 200,
    height: 100,
    shape: 'sine',
    color: 'black',
    strokeWidth: 5,
    strokeLinecap: 'round',
    opacity: 1,
    frequency: 1,
    amplitude: 1,
    offset: 0,
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

    const svgPath = createSVGPathFromWaveformPoints(points, height);

    return (
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        <path
          d={svgPath}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          fill="none"
          style={{ opacity, transition: 'opacity 500ms' }}
        />
      </svg>
    );
  }
}

export default Waveform;
