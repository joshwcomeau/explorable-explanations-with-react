// @flow
import React, { Component, Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import ReactRallyWaveform from './ReactRallyWaveformV2';

storiesOf('ReactRallyWaveformV2', module).add(
  'Default',
  () => <ReactRallyWaveform />
);
