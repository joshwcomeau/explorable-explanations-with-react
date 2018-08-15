// @flow
/**
 * IGNORE ME
 * This component is from a prior universe. It still exists only because I
 * didn't have time to backtrack and clean up old components.
 */
import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

import { SPRING_SETTINGS } from '../../constants';

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
  // When we receive the request to stop the animation, it's nice to follow
  // through to the end of the current cycle, so that it winds up in its
  // original position.
  // This number controls the cycle the stop was requested in.
  stopRequestedAtCycle: ?number,
};

class WaveformStopwatch extends Component<Props, State> {
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

  componentDidMount() {
    if (this.props.isRunning) {
      this.start();
    }
  }

  componentDidUpdate(prevProps) {
    const isJustStarting = !prevProps.isRunning && this.props.isRunning;
    const isJustStopping = prevProps.isRunning && !this.props.isRunning;

    // When stopping, there may be a delay between the prop-change and when
    // the stopwatch actually stops (this is because it 'rounds' to the nearest
    // period). If we're in this twilight moment, do nothing.
    if (isJustStarting && this.state.stopRequestedAt) {
      return;
    }

    if (isJustStarting) {
      this.start();
    } else if (isJustStopping) {
      this.stop();
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrameId);
  }

  start = () => {
    this.setState({ lastTickAt: new Date() }, this.tick);
  };

  stop = () => {
    this.setState({
      stopRequestedAtCycle: this.state.progress,
    });
  };

  tick = () => {
    this.animationFrameId = window.requestAnimationFrame(() => {
      const { frequency } = this.props;
      const { progress, stopRequestedAtCycle, lastTickAt } = this.state;

      if (!lastTickAt) {
        return;
      }

      const tickAt = new Date();

      let secondsSinceLastTick = (tickAt - lastTickAt) / 1000;
      // Let's clamp the `secondsSinceLastTick` to 0.5 max. This is to avoid the
      // wild flurry that happens when returning to an inactive tab.
      secondsSinceLastTick = Math.min(secondsSinceLastTick, 0.5);

      const periodsSinceLastTick = secondsSinceLastTick * frequency;

      // At first glance, you might think we're just translating a fixed SVG
      // by `n` pixels to the left on every tick.
      // Actually, though, we're redrawing the wave on every tick.
      // This winds up being simpler, since it's an endless animation; this way
      // we don't have to worry about running out of wave, and every tick is
      // exactly the same.
      //
      // So, since we're not actually "moving" anything, all we need to know is
      // how many cycles have passed. If the number is 0.2, we're 20% through
      // the wave, and can start drawing from there.
      // By changing that value, we get the illusion of it moving.
      // on every frame.

      const nextProgressVal = progress + periodsSinceLastTick;

      // If this is the tick that pushes us into the next cycle, and we've
      // requested a stop, let's end this animation.
      if (typeof stopRequestedAtCycle === 'number') {
        this.setState({
          progress: Math.floor(nextProgressVal),
          lastTickAt: tickAt,
          stopRequestedAtCycle: null,
        });
        return;
      }

      this.setState(
        { progress: nextProgressVal, lastTickAt: tickAt },
        this.tick
      );
    });
  };

  render() {
    const { progress } = this.state;

    return (
      <Motion
        defaultStyle={{ progress: 0 }}
        style={{ progress: spring(progress, SPRING_SETTINGS) }}
      >
        {({ progress }) => this.props.children(progress)}
      </Motion>
    );
  }
}

export default WaveformStopwatch;
