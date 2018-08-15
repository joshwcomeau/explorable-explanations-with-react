/**
 * IGNORE ME
 * This component is from a prior universe. It still exists only because I
 * didn't have time to backtrack and clean up old components.
 *
 * The older version was actually more modular, which was important for this
 * presentation (for example, there's no way to avoid springing values in the
 * new Waveform component). Outside of the very niche concenrs of this
 * presentation, though, the new form works better
 */
import React, { Component } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Slider from '../Slider';
import Spacer from '../Spacer';
import WaveformCalculator from '../WaveformCalculator';
import WaveformOld from '../WaveformOld';
import WaveformState from '../WaveformState';
import WaveformAxis from '../WaveformAxis';

class ReactRallyWaveform extends Component {
  static defaultProps = {
    width: 500,
    height: 250,
    showControls: true,
  };

  render() {
    const { width, height, showControls } = this.props;

    return (
      <WaveformState>
        {({ amplitude, frequency, updateAmplitude, updateFrequency }) => (
          <Wrapper>
            <WaveformCalculator
              shape="sine"
              frequency={frequency}
              amplitude={amplitude}
              width={width}
              height={height}
            >
              {points => (
                <WaveformOld
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
                      onChange={updateAmplitude}
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
                      onChange={updateFrequency}
                    />
                  </SliderWrapper>
                </Sliders>
              </Controls>
            )}
          </Wrapper>
        )}
      </WaveformState>
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
