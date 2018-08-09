// @flow
import React, { Component, Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import ReactRallyWaveform from './ReactRallyWaveformV5';

storiesOf('ReactRallyWaveformV5', module).add(
  'Default',
  () => <ReactRallyWaveform />
);
