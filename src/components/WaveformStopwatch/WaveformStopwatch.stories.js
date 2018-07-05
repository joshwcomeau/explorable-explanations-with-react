// @flow
import React, { Component, Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { SHAPES } from '../../constants';

import Waveform from '../Waveform';
import WaveformCalculator from '../WaveformCalculator';
import WaveformStopwatch from './WaveformStopwatch';

storiesOf('WaveformStopwatch', module)
  .add('Basic count, default frequency-snap', () => (
    <StopwatchManager>
      {timeElapsed => <span>{timeElapsed}</span>}
    </StopwatchManager>
  ))
  .add('Snap to 2Hz', () => (
    <StopwatchManager frequency={2}>
      {timeElapsed => <span>{timeElapsed}</span>}
    </StopwatchManager>
  ))
  .add('Progress Bar', () => (
    <StopwatchManager>
      {timeElapsed => <StopwatchBar progress={timeElapsed} />}
    </StopwatchManager>
  ))
  .add('Waveform', () => (
    <StopwatchManager frequency={2}>
      {timeElapsed => (
        <WaveformCalculator
          width={500}
          height={250}
          frequency={2}
          timeElapsed={timeElapsed}
        >
          {points => <Waveform points={points} />}
        </WaveformCalculator>
      )}
    </StopwatchManager>
  ));

class StopwatchManager extends Component {
  state = {
    isRunning: false,
  };

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeypress);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeypress);
  }

  handleKeypress = ev => {
    switch (ev.key) {
      case ' ':
        return this.toggle();
    }
  };

  toggle = shape => this.setState(state => ({ isRunning: !state.isRunning }));

  render() {
    const { children, frequency } = this.props;

    return (
      <Fragment>
        <WaveformStopwatch
          snapToFrequency={frequency}
          isRunning={this.state.isRunning}
        >
          {children}
        </WaveformStopwatch>
        <button onClick={this.toggle}>Toggle</button>
      </Fragment>
    );
  }
}

class StopwatchBar extends Component {
  render() {
    const { progress } = this.props;

    return (
      <BarWrapper>
        <Bar progress={progress} />
        {[1, 2, 3, 4].map(offset => <Notch offset={offset} />)}
      </BarWrapper>
    );
  }
}

const BarWrapper = styled.div`
  position: relative;
  width: 500px;
  height: 20px;
  background: rgba(0, 0, 0, 0.15);
  overflow: hidden;
  border-radius: 20px;
`;

const Bar = styled.div.attrs({
  style: props => ({
    transform: `scaleX(${props.progress + 0.001})`,
  }),
})`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100px;
  height: 20px;
  background: red;
  transform-origin: center left;
`;

const Notch = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: ${props => props.offset * 100}px;
  width: 1px;
  background: rgba(0, 0, 0, 0.2);
`;
