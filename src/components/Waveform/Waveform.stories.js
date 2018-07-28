// @flow
import React, { Component, Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import Waveform from './Waveform';

storiesOf('Waveform', module).add('Basic Sine', () => (
  <Waveform frequency={1} amplitude={1} shape="sine" width={500} height={250} />
));
