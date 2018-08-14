import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Slider from '../Slider';
import Spacer from '../Spacer';
import Waveform from '../Waveform';
import WaveformAxis from '../WaveformAxis';
import Label from '../Label';
import Timekeeper from '../Timekeeper/Timekeeper';

class ReactRallyWaveform extends Component {
  state = {
    frequency: 1,
    amplitude: 1,
    shape: 'sine',
    timeElapsed: 0,
  };

  static defaultProps = {
    width: 500,
    height: 250,
  };

  updateTimeElapsed = timeElapsed => {
    this.setState({ timeElapsed });
  };

  updateFrequency = frequency => {
    this.setState({ frequency });
  };

  render() {
    const { width, height } = this.props;
    const { frequency, amplitude, shape, timeElapsed } = this.state;

    return (
      <Wrapper>
        <Waveform
          width={width}
          height={height}
          frequency={frequency}
          amplitude={amplitude}
          shape={shape}
          timeElapsed={timeElapsed * frequency}
          color={COLORS.blue[700]}
          strokeWidth={4}
        />

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
                label="Time Elapsed"
                min={0}
                max={2000}
                step={1}
                value={timeElapsed}
                onChange={this.updateTimeElapsed}
              />
            </Column>
          </Row>

          <Row>
            <Column>
              <Slider
                label="Frequency"
                min={0.05}
                max={2}
                step={0.05}
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
