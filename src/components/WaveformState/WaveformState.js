/**
 * IGNORE ME
 * This component is from a prior universe. It still exists only because I
 * didn't have time to backtrack and clean up old components.
 */

import { Component } from 'react';

class WaveformState extends Component {
  static defaultProps = {
    initialFrequency: 1,
    initialAmplitude: 1,
    initialShape: 'sine',
    initialisRunning: false,
  };
  state = {
    frequency: this.props.initialFrequency,
    amplitude: this.props.initialAmplitude,
    shape: this.props.initialShape,
    isRunning: this.props.isRunning,
  };

  updateAmplitude = amplitude => {
    this.setState({ amplitude });
  };

  updateFrequency = frequency => {
    this.setState({ frequency });
  };

  updateShape = shape => {
    this.setState({ shape });
  };

  toggleRunning = () => {
    this.setState(state => ({
      isRunning: !state.isRunning,
    }));
  };

  render() {
    const { children } = this.props;

    return children({
      ...this.state,
      updateAmplitude: this.updateAmplitude,
      updateFrequency: this.updateFrequency,
      updateShape: this.updateShape,
      toggleRunning: this.toggleRunning,
    });
  }
}

export default WaveformState;
