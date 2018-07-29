import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Waveform from '../Waveform';
import WaveformAxis from '../WaveformAxis';
import WaveformCalculator from '../WaveformCalculator';
import WaveformStopwatch from '../WaveformStopwatch';

class ReactRallyWaveform extends Component {
  state = {
    frequency: 1,
    amplitude: 1,
    stopwatchRunning: false,
  };

  static defaultProps = {
    width: 500,
    height: 250,
  };

  toggleRunning = () => {
    this.setState(state => ({
      stopwatchRunning: !state.stopwatchRunning,
    }));
  };

  render() {
    const { width, height } = this.props;
    const { frequency, amplitude, stopwatchRunning } = this.state;

    console.log({ stopwatchRunning });

    return (
      <Wrapper>
        <WaveformStopwatch frequency={frequency} isRunning={stopwatchRunning}>
          {progress => (
            <WaveformCalculator
              shape="sine"
              frequency={frequency}
              amplitude={amplitude}
              progress={progress}
              width={width}
              height={height}
            >
              {points => (
                <Fragment>
                  <Waveform
                    width={width}
                    height={height}
                    points={points}
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
                </Fragment>
              )}
            </WaveformCalculator>
          )}
        </WaveformStopwatch>

        <button onClick={this.toggleRunning}>Toggle</button>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export default ReactRallyWaveform;
