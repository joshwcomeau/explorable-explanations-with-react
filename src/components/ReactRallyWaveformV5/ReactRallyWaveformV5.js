import React, { Component } from 'react';

import WaveformState from '../WaveformState';
import Stopwatch from '../Stopwatch';

class ReactRallyWaveform extends Component {
  render() {
    const {
      width,
      height,
      shape,
      amplitude,
      frequency,
      updateAmplitude,
      updateFrequency,
      updateShape,
      toggleRunning,
    } = this.props;

    return (
      <Fragment>
        <Waveform
          points={points}
          width={width}
          height={height}
          color={COLORS.blue}
          strokeWidth={4}
        />
        <WaveformAxis
          axis="x"
          width={width}
          height={height}
        />
        <WaveformAxis
          axis="y"
          width={width}
          height={height}
        />

        <div>
          <Slider
            label="amplitude"
            value={amplitude}
            onChange={updateAmplitude}
          />

          <Slider
            label="frequency"
            value={frequency}
            onChange={updateFrequency}
          />
        </div>
      </Fragment>
    );
  }
}

export { ReactRallyWaveform };

export default ({ width, height }) => (
  <WaveformState>
    {({
      amplitude,
      frequency,
      shape,
      isRunning,
      updateAmplitude,
      updateFrequency,
      updateShape,
      toggleRunning,
    }) => (
      <Stopwatch isRunning={isRunning}>
        {({ timeElapsed }) => (
          <WaveformCalculator
            shape="sine"
            frequency={frequency}
            amplitude={amplitude}
            timeElapsed={timeElapsed}
            width={width}
            height={height}
          >
            {points => (
              <ReactRallyWaveform
                width={width}
                height={height}
                shape={shape}
                amplitude={amplitude}
                frequency={frequency}
                updateAmplitude={updateAmplitude}
                updateFrequency={updateFrequency}
                updateShape={updateShape}
                toggleRunning={toggleRunning}
              />
            )}
          </WaveformCalculator>
        )}
      </Stopwatch>
    )}
  </WaveformState>
);
