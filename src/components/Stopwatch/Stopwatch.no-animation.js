// @flow
import React, { Component } from 'react';

type Props = {
  isRunning: boolean,
  children: (
    timeElapsed: number
  ) => React$Node,
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

  componentDidMount() {
    if (this.props.isRunning) {
      this.start();
    }
  }

  componentDidUpdate(prevProps) {
    const isJustStarting =
      !prevProps.isRunning &&
      this.props.isRunning;

    if (isJustStarting) {
      this.start();
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(
      this.animationFrameId
    );
  }

  start = () => {
    this.setState(
      { lastTickAt: new Date() },
      this.tick
    );
  };

  tick = () => {
    this.animationFrameId = window.requestAnimationFrame(
      () => {
        const { isRunning } = this.props;
        const {
          timeElapsed,
          lastTickAt,
        } = this.state;

        if (!isRunning) {
          return;
        }

        const currentTime = new Date();
        const timeSinceLastTick =
          currentTime - lastTickAt;

        this.setState(
          {
            timeElapsed:
              timeElapsed + timeSinceLastTick,
            lastTickAt: currentTime,
          },
          this.tick
        );
      }
    );
  };

  render() {
    const { children } = this.props;
    const { timeElapsed } = this.state;

    return children(timeElapsed);
  }
}

export default Stopwatch;
