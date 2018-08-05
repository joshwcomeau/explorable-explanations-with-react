import { Component } from 'react';

class WaveformState extends Component {
  static defaultProps = {
    initialFrequency: 1,
    initialAmplitude: 1,
    initialShape: 'sine',
    initialStopwatchRunning: false,
  }
  state = {
    frequency: this.props.initialFrequency,
    amplitude: this.props.initialAmplitude,
    shape: this.props.initialShape,
    stopwatchRunning: this.props.stopwatchRunning,
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
      stopwatchRunning: !state.stopwatchRunning,
    }));
  };

  render() {
    const {children} = this.props;

    return children({
      ...this.state,
      updateAmplitude: this.updateAmplitude,
      updateFrequency: this.updateFrequency,
      updateShape: this.updateShape,
      toggleRunning: this.toggleRunning,
    })
  }
}

export default WaveformState;
