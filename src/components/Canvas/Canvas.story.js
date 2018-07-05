import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Canvas from './Canvas';

class CanvasWrapper extends Component {
  componentDidMount() {
    if (!this.canvas) {
      return;
    }

    this.ctx = this.canvas.getContext('2d');

    this.ctx.beginPath();
    this.ctx.moveTo(20, 20);
    this.ctx.lineTo(230, 20);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  render() {
    return (
      <Canvas
        width={250}
        height={250}
        style={{ border: '1px solid black' }}
        innerRef={elem => (this.canvas = elem)}
      />
    );
  }
}

storiesOf('Canvas', module)
  .add('basic', () => (
    <Canvas width={250} height={250} style={{ border: '1px solid black' }} />
  ))
  .add('simple line', () => <CanvasWrapper />);
