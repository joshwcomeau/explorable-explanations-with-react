import React, { Component } from 'react';

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

    return <div style={{ padding: 40}}>
      {children({
        ...this.state,
        updateAmplitude: this.updateAmplitude,
        updateFrequency: this.updateFrequency,
        updateShape: this.updateShape,
        toggleRunning: this.toggleRunning,
      })}
    </div>;
  }
}

export default WaveformState;
