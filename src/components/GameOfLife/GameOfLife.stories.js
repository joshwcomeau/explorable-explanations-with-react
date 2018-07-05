import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import GameOfLife from '../GameOfLife';

storiesOf('GameOfLife', module)
  .add('basic', () => <GameOfLife />)
  .add('Fixed height', () => <GameOfLife height={300} />)
  .add('Muted colors', () => (
    <GameOfLife
      colors={['#FFFFFF', '#f4f4f4', '#ececec', '#e0e0e0', '#dadada']}
    />
  ));
