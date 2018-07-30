// @flow
import React, { Component } from 'react';

type Props = {
  isRunning: boolean,
  frequency: number,
  children: (progress: number) => React$Node,
};

type State = {
  // `progress` is the number of cycles that have advanced since starting.
  // It can be decimal: eg. a progress of 1.5 means that the waveform has
  // advanced by 1 and a half iterations.
  progress: number,
  lastTickAt: ?Date,
};

class WaveformStopwatch extends Component {
  animationFrameId: number;

  state = {
    progress: 0,
    lastTickAt: null,
    stopRequestedAtCycle: null,
  };

  static defaultProps = {
    isRunning: false,
    frequency: 1,
  };

  componentDidUpdate(prevProps) {
    const isJustStarting = !prevProps.isRunning && this.props.isRunning;

    if (isJustStarting) {
      this.start();
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrameId);
  }

  start = () => {
    this.setState({ lastTickAt: new Date() }, this.tick);
  };

  tick = () => {
    if (!this.props.isRunning) {
      return;
    }

    this.animationFrameId = window.requestAnimationFrame(() => {
      const { frequency } = this.props;
      const { progress, lastTickAt } = this.state;

      const tickAt = new Date();

      const secondsSinceLastTick = (tickAt - lastTickAt) / 1000;
      const periodsSinceLastTick = secondsSinceLastTick * frequency;

      const nextProgressVal = progress + periodsSinceLastTick;

      this.setState(
        { progress: nextProgressVal, lastTickAt: tickAt },
        this.tick
      );
    });
  };

  render() {
    return this.props.children(this.state.progress);
  }
}

export default WaveformStopwatch;
