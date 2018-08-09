// @flow
import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

import { SPRING_SETTINGS } from '../../constants';

type Props = {
  isRunning: boolean,
  children: (timeElapsed: number) => React$Node,
};

type State = {
  timeElapsed: number,
  startedAt: ?Date,
};

class Stopwatch extends Component {
  animationFrameId: number;

  state = {
    timeElapsed: 0,
    lastTickAt: null,
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
    this.animationFrameId = window.requestAnimationFrame(() => {
      const { isRunning } = this.props;
      const { timeElapsed, lastTickAt } = this.state;

      if (!isRunning) {
        return;
      }

      const currentTime = new Date();
      const timeSinceLastTick = currentTime - lastTickAt;

      this.setState(
        {
          timeElapsed: timeElapsed + timeSinceLastTick,
          lastTickAt: currentTime,
        },
        this.tick
      );
    });
  };

  render() {
    const { timeElapsed } = this.state;

    return (
      <Motion
        defaultStyle={{ timeElapsed: 0 }}
        style={{
          timeElapsed: spring(timeElapsed, SPRING_SETTINGS),
        }}
      >
        {({ timeElapsed }) => this.props.children(timeElapsed)}
      </Motion>
    );
  }
}

export default Stopwatch;
