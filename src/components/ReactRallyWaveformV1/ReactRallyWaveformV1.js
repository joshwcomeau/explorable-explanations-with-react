import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

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
  };

  render() {
    const { width, height } = this.props;
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
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export default ReactRallyWaveform;
