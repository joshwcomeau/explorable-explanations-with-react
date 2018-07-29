// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { DEFAULT_WAVEFORM_SIZE } from '../../constants';

import WaveformStopwatch from '../WaveformStopwatch';
import AirGrid from './AirGrid';

storiesOf('AirGrid', module)
  .add('Static', () => (
    <AirGrid
      shape="sine"
      waveformAmplitude={1}
      waveformFrequency={1}
      waveformProgress={0}
    />
  ))
  .add('Default (1Hz, 1dB, 8x4)', () => (
    <WaveformStopwatch isRunning>
      {progress => (
        <AirGrid
          shape="sine"
          numOfRows={4}
          numOfCols={8}
          waveformAmplitude={1}
          waveformFrequency={1}
          waveformProgress={progress}
        />
      )}
    </WaveformStopwatch>
  ))
  .add('Quiet (1Hz, 0.5dB, 8x4)', () => (
    <WaveformStopwatch isRunning amplitude={0.5}>
      {progress => (
        <AirGrid
          shape="sine"
          numOfRows={4}
          numOfCols={8}
          waveformAmplitude={0.5}
          waveformFrequency={1}
          waveformProgress={progress}
        />
      )}
    </WaveformStopwatch>
  ));
