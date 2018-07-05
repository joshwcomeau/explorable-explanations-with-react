// @flow
import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

import { SPRING_SETTINGS } from '../../constants';

type Props = {
  isRunning: boolean,
  snapToFrequency: number,
};

type State = {
  timeElapsed: number,
  lastTickAt: ?Date,
  stopRequestedAt: ?number,
};

class WaveformStopwatch extends Component {
  animationFrameId: number;

  state = {
    startedAt: null,
    lastTickAt: null,
    stopRequestedAt: null,
  };

  static defaultProps = {
    isRunning: false,
    snapToFrequency: 1,
  };

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
      this.requestStop();
    }
  }

  start = () => {
    const startedAt = new Date();

    this.setState(
      {
        startedAt,
        lastTickAt: startedAt,
      },
      this.tick
    );
  };

  requestStop = () => {
    this.setState({
      stopRequestedAt: new Date(),
    });
  };

  stop = finalTickAt => {
    this.setState(state => ({
      lastTickAt: finalTickAt,
      stopRequestedAt: null,
    }));
  };

  tick = () => {
    this.animationFrameId = window.requestAnimationFrame(() => {
      const { snapToFrequency } = this.props;
      const { startedAt, lastTickAt, stopRequestedAt } = this.state;

      // TODO: is this check necessary? What for?
      if (!lastTickAt) {
        return;
      }

      const tickAt = new Date();
      const secondsSinceLastTick = (tickAt - lastTickAt) / 1000;

      if (stopRequestedAt) {
        // We may wish to 'snap' to the nearest frequency (eg. 2Hz)
        // First, find the period for this frequency, since that's the number
        // of seconds we want to snap to
        // (eg. 2Hz means we want to snap to the nearest 500ms)
        const period = 1 / snapToFrequency;

        // How much time passed between the start of the stopwatch, and when the
        // stop was requested? How many periods does that correspond to?
        const deltaBetweenStartAndStop = (stopRequestedAt - startedAt) / 1000;
        const numOfPeriodsBetweenStartAndStop = Math.floor(
          deltaBetweenStartAndStop / period
        );

        // We want to stop the stopwatch right as it passes 1 more period.
        // So if there were 8 periods between start and stop, and there's been
        // 9 periods between start and now, we can round down the time to that
        // last period and end now.
        const deltaBetweenStartAndNow = (tickAt - startedAt) / 1000;
        const numOfPeriodsBetweenStartAndNow = Math.floor(
          deltaBetweenStartAndNow / period
        );

        if (numOfPeriodsBetweenStartAndNow > numOfPeriodsBetweenStartAndStop) {
          // It's time to stop!
          // Round to the nearest frequency interval. So if our frequency is
          // 2Hz, round to the nearest 0.5 seconds.
          // There's probably a smarter way to do this, but for now I'm just
          // converting the number of periods to seconds, and adding it.
          const numOfNewMilliseconds =
            numOfPeriodsBetweenStartAndNow * period * 1000;

          const finalTickAt = new Date(startedAt);
          finalTickAt.setMilliseconds(
            finalTickAt.getMilliseconds() + numOfNewMilliseconds
          );

          this.stop(finalTickAt);
          return;
        }
      }

      this.setState({ lastTickAt: tickAt }, this.tick);
      return;
    });
  };

  render() {
    const { startedAt, lastTickAt } = this.state;

    let timeElapsed;
    if (startedAt instanceof Date && lastTickAt instanceof Date) {
      const rawTimeElapsed = (lastTickAt - startedAt) / 1000;
      timeElapsed = spring(rawTimeElapsed, SPRING_SETTINGS);
    } else {
      timeElapsed = 0;
    }

    return (
      <Motion
        defaultStyle={{ timeElapsed: 0 }}
        style={{ timeElapsed }}
        onRest={() => this.setState({ startedAt: null, lastTickAt: null })}
      >
        {({ timeElapsed }) => this.props.children(timeElapsed)}
      </Motion>
    );
  }
}

export default WaveformStopwatch;
