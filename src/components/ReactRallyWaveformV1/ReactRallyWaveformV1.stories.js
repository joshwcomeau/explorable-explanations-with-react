// @flow
import React, { Component, Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import ReactRallyWaveform from './ReactRallyWaveformV1';

storiesOf('ReactRallyWaveformV1', module).add(
  'Default',
  () => <ReactRallyWaveform />
);
