// @flow
import React, { Component } from 'react';

import {
  getPointsForWaveform,
  createSVGPathFromWaveformPoints,
  translateAxisRelativeYValue,
} from '../../helpers/waveform.helpers';

const CANVAS_PADDING = 10;
const WAVEFORM_ASPECT_RATIO = 0.5;

export type Props = {
  // In most cases, the Waveform simply requires an enum waveform shape, like
  // 'sine' or 'square'.
  shape: WaveformShape,
  // In certain cases (eg. waveform addition), it's more helpful to provide an
  // array of points, instead of a `shape`. The Waveform will simply plot those
  // points, in that case.
  points?: Array<WaveformPoint>,
  width: number,
  height: number,

  // Line color for the waveform line.
  // TODO: Find a way to support other line features (width, endcap) in a nice
  // way?
  color: string,
  strokeWidth: number,
  strokeLinecap: Linecap,
  opacity: number,
  // frequency is the number of cycles to squeeze into this waveform
  // visualization. The default value of `1` means that a single iteration of
  // the waveform is drawn. `2` means that the cycle is rendered twice, etc
  // This can be thought of as `frequency`, if the X-axis is thought to range
  // between 0s and 1s. I've avoided naming it `frequency` to avoid ambiguity
  // with WaveformPlayer, which controls how fast the waveform actually moves.
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

  renderTo: 'svg' | 'canvas',
};

class Waveform extends Component<Props> {
  static defaultProps = {
    width: 200,
    height: 100,
    shape: 'sine',
    color: 'black',
    strokeWidth: 1,
    strokeLinecap: 'butt',
    opacity: 1,
    frequency: 1,
    amplitude: 1,
    offset: 0,
    renderTo: 'svg',
  };

  /**
   * This method gathers the data needed to perform the drawing.
   * In the most common case, this transforms a WaveformShape like 'sine' into
   * an array of {x,y} coordinates.
   *
   * Furthermore, these values are fully ready--to-draw; the coordinates are in
   * "real" space. This means that for SVGs, the X values range from 0 to width.
   * The y values range from 0 to height. It also takes into account Canvas
   * padding, which needs to be accounted for.
   */
  getPoints(): Array<WaveformPoint> {
    const { width, height, shape, frequency, amplitude, offset, renderTo } = this.props;
    let { points } = this.props;

    if (typeof points === 'undefined') {
      points = getPointsForWaveform({
        shape,
        frequency,
        amplitude,
        width,
        offset,
      });
    }

    // `points` will be mathy values: y-values ranging from -1 to 1.
    // We want to convert that to values understandable by our waveform
    // drawing surfaces: values from 0 to the height of the canvas/svg.
    // For Canvas only: We need to add a bit of padding to each value.
    const drawablePoints = points.map(({ x, y }) => {
      const relativeY = translateAxisRelativeYValue(y, height);

      return {
        x: x,
        y: relativeY,
      };
    });

    return drawablePoints;
  }

  render() {
    const { shape, width, height, renderTo, color, strokeWidth, strokeLinecap, opacity } = this.props;

    const points = this.getPoints();

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
