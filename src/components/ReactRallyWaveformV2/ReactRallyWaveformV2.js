import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Slider from '../Slider';
import Spacer from '../Spacer';
import Label from '../Label';
import Waveform from '../Waveform';
import WaveformAxis from '../WaveformAxis';
import WaveformCalculator from '../WaveformCalculator';
import WaveformStopwatch from '../WaveformStopwatch/WaveformStopwatchSimple';

class ReactRallyWaveform extends Component {
  state = {
    frequency: 1,
    amplitude: 1,
    shape: 'sine',
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

  render() {
    const { width, height } = this.props;
    const { frequency, amplitude, shape } = this.state;

    return (
      <Wrapper>
        <WaveformCalculator
          animateAmplitudeAndFrequency
          shape={shape}
          frequency={frequency}
          amplitude={amplitude}
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
