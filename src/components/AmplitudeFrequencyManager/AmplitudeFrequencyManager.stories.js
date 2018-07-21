// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import AmplitudeFrequencyManager from './AmplitudeFrequencyManager';

storiesOf('AmplitudeFrequencyManager', module)
  .add('Default', () => (
    <AmplitudeFrequencyManager>
      {(args) => JSON.stringify(args)}
    </AmplitudeFrequencyManager>
  ))
