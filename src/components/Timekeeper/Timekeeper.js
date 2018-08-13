import React, { Component } from 'react';
import { Spring } from 'react-spring';

class Timekeeper extends Component {
  state = {
    timeElapsed: 0,
    isRunning: false,
    lastTickAt: null,
  };

  componentDidMount() {
    if (this.props.isRunning) {
      this.start();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const isJustStarting = !prevState.isRunning && this.state.isRunning;

    if (isJustStarting) {
      this.start();
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrameId);
  }

  start = () => {
    this.setState({ isRunning: true, lastTickAt: new Date() }, this.tick);
  };

  tick = () => {
    this.animationFrameId = window.requestAnimationFrame(() => {
      const { timeElapsed, isRunning, lastTickAt } = this.state;

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

  toggleRunning = () => {
    this.setState(state => ({
      isRunning: !state.isRunning,
    }));
  };

  render() {
    const { children } = this.props;
    const { timeElapsed } = this.state;
    const { toggleRunning } = this;

    return children({ timeElapsed, toggleRunning });
  }
}

export default Timekeeper;
