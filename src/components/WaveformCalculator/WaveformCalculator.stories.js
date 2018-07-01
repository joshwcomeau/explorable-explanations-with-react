// @flow
import React, { Component, Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import { SHAPES } from '../../constants';

import Waveform from '../Waveform';
import WaveformCalculator from './WaveformCalculator';

class ShapeToggle extends Component {
  state = {
    shape: 'sine',
  };

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeypress);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeypress);
  }

  updateShape = shape => this.setState({ shape });

  handleKeypress = ev => {
    switch (ev.key) {
      case '1':
        return this.updateShape('sine');
      case '2':
        return this.updateShape('triangle');
      case '3':
        return this.updateShape('square');
      case '4':
        return this.updateShape('sawtooth');
    }
  };

  render() {
    const { children } = this.props;
    const { shape } = this.state;

    return (
      <span style={{ display: 'inline-block' }}>
        {children(shape)}
        <br />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            margin: '20px 0',
          }}
        >
          <button onClick={() => this.updateShape('sine')}>Sine</button>
          <button onClick={() => this.updateShape('triangle')}>Triangle</button>
          <button onClick={() => this.updateShape('square')}>Square</button>
          <button onClick={() => this.updateShape('sawtooth')}>Sawtooth</button>
        </div>
      </span>
    );
  }
}

// The typical usecase is to provide a `shape` and let <Waveform> work out the
// specific points, but during waveform addition, the waveform needs to draw
// arbitrary points. This story checks that alternative usecase.
storiesOf('WaveformCalculator', module)
  .add('Basic Sine', () => (
    <WaveformCalculator width={500} height={250} frequency={1} amplitude={1}>
      {points => <Waveform width={500} height={250} points={points} />}
    </WaveformCalculator>
  ))
  .add('Shapeshifter', () => (
    <ShapeToggle>
      {shape => (
        <WaveformCalculator
          shape={shape}
          width={500}
          height={250}
          frequency={1}
          amplitude={1}
        >
          {points => <Waveform width={500} height={250} points={points} />}
        </WaveformCalculator>
      )}
    </ShapeToggle>
  ));
