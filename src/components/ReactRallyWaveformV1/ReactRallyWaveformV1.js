import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Slider from '../Slider';
import Spacer from '../Spacer';
import WaveformCalculator from '../WaveformCalculator';
import Waveform from '../Waveform';
import WaveformAxis from '../WaveformAxis';

class ReactRallyWaveform extends Component {
  state = {
    frequency: 1,
    amplitude: 1,
  };

  static defaultProps = {
    width: 500,
    height: 250,
    showControls: true,
  };

  updateAmplitude = amplitude => {
    this.setState({ amplitude });
  };

  updateFrequency = frequency => {
    this.setState({ frequency });
  };

  render() {
    const { width, height, showControls } = this.props;
    const { frequency, amplitude } = this.state;

    return (
      <Wrapper>
        <WaveformCalculator
          shape="sine"
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

        {showControls && (
          <Controls>
            <Sliders>
              <SliderWrapper>
                <Slider
                  label="amplitude"
                  min={0}
                  max={1}
                  step={0.01}
                  value={amplitude}
                  onChange={this.updateAmplitude}
                />
              </SliderWrapper>
              <Spacer size={70} />
              <SliderWrapper>
                <Slider
                  label="frequency"
                  min={0.05}
                  max={2}
                  step={0.01}
                  value={frequency}
                  onChange={this.updateFrequency}
                />
              </SliderWrapper>
            </Sliders>
          </Controls>
        )}
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

const Sliders = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: left;
  margin: 30px 0px;
`;

const SliderWrapper = styled.div`
  flex: 1;
`;

export default ReactRallyWaveform;
