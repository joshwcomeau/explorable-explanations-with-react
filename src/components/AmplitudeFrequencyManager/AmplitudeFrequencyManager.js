import React, { Component, Fragment } from 'react';
import {Motion, spring} from 'react-motion';
import styled from 'styled-components';

import WaveformStopwatch from '../WaveformStopwatch';
import AirGrid from '../AirGrid';
import Slider from '../Slider';
import Spacer from '../Spacer';

class AirGridManager extends Component {
  static defaultProps = {
    initialAmplitude: 1,
    initialFrequency: 1,
  }

  state = {
    amplitude: this.props.initialAmplitude,
    frequency: this.props.initialFrequency,
  };

  updateAmplitude = amplitude => {
    this.setState({ amplitude });
  };

  updateFrequency = frequency => {
    this.setState({ frequency });
  };

  render() {
    const { amplitude, frequency } = this.state;
    const { children } = this.props;

    return (
      <Wrapper>
        <Motion style={{ amplitude: spring(amplitude), frequency: spring(frequency) }}>
          {({ amplitude, frequency }) => (
            <Fragment>
              <WaveformStopwatch isRunning frequency={frequency}>
                {progress => children({ amplitude, frequency, progress })}
              </WaveformStopwatch>

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
            </Fragment>
          )}
        </Motion>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: inline-block;
`;

const Sliders = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: left;
  margin-top: 30px;
`;

const SliderWrapper = styled.div`
  flex: 1;
`;

export default AirGridManager;
