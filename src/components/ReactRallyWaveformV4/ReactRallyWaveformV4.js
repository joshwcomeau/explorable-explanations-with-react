import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Slider from '../Slider';
import Spacer from '../Spacer';
import Waveform from '../Waveform';
import WaveformAxis from '../WaveformAxis';
import Label from '../Label';
import WaveformCalculator from '../WaveformCalculator';
import WaveformStopwatch from '../WaveformStopwatch';

class ReactRallyWaveform extends Component {
  state = {
    frequency: 1,
    amplitude: 1,
    shape: 'sine',
    stopwatchRunning: false,
  };

  static defaultProps = {
    width: 500,
    height: 250,
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
    const { width, height } = this.props;
    const { frequency, amplitude, shape, stopwatchRunning } = this.state;

    return (
      <Wrapper>
        <WaveformStopwatch frequency={frequency} isRunning={stopwatchRunning}>
          {progress => (
            <WaveformCalculator
              animateAmplitudeAndFrequency
              shape={shape}
              frequency={frequency}
              amplitude={amplitude}
              progress={progress}
              width={width}
              height={height}
            >
              {points => (
                <Waveform
                  width={width}
                  height={height}
                  points={points}
                  color={COLORS.blue[700]}
                  strokeWidth={4}
                />
              )}
            </WaveformCalculator>
          )}
        </WaveformStopwatch>

        <WaveformAxis
          x
          waveformSize={width}
          strokeWidth={4}
          strokeLinecap="round"
        />
        <WaveformAxis
          y
          waveformSize={width}
          strokeWidth={4}
          strokeLinecap="round"
        />

        <Controls>
          <Row>
            <Column>
              <Slider
                label="amplitude"
                min={0}
                max={1}
                step={0.01}
                value={amplitude}
                onChange={this.updateAmplitude}
              />
            </Column>
            <Spacer size={70} />
            <Column>
              <Slider
                label="frequency"
                min={0.05}
                max={2}
                step={0.01}
                value={frequency}
                onChange={this.updateFrequency}
              />
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>Shape</Label>
              <button onClick={() => this.updateShape('sine')}>Sine</button>
              <button onClick={() => this.updateShape('triangle')}>
                Triangle
              </button>
              <button onClick={() => this.updateShape('square')}>Square</button>
              <button onClick={() => this.updateShape('sawtooth')}>
                Sawtooth
              </button>
            </Column>
            <Spacer size={70} />
            <Column>
              <Label>Play</Label>
              <button onClick={this.toggleRunning}>Toggle</button>
            </Column>
          </Row>
        </Controls>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Controls = styled.div`
  width: 500px;
  margin-top: 30px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: left;
  margin: 30px 0px;
`;

const Column = styled.div`
  flex: 1;
`;

export default ReactRallyWaveform;
